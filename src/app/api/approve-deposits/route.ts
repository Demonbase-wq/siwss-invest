import { deposits, transactions, users, referrals } from "@/lib/airtable";
import { auth } from "../../../../auth";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string), // Convert string to number
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
//   debug: true, 
//   logger: true, 
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 200 });
  }

  try {
    const { id } = await request.json();

    // Fetch the deposit record
    const deposit = await deposits.find(id);

    if (!deposit || deposit.fields.status === "Approved") {
      return Response.json(
        { error: "Deposit not found or already approved." },
        { status: 200 }
      );
    }

    const { user_id, amount } = deposit.fields;

    // Update deposit status to "Approved"
    const updatedDeposit = await deposits.update(id, { status: "Approved" });
    const date = updatedDeposit?.fields.updated as string;

    // Update corresponding transaction
    const transaction = await transactions
      .select({
        filterByFormula: `AND({type} = 'Deposit', {reference_id} = "${id}")`,
      })
      .firstPage();

    if (transaction.length) {
      await transactions.update(transaction[0].id, { status: "Approved" });
    }

    // Update user balance
    const user = await users.find(user_id as string);
    const balance = user?.fields.balance as number;
    const depositAmount = amount as number;
    const newBalance = (balance || 0) + depositAmount;
    await users.update(user_id as string, { balance: newBalance });

    const formattedUpdatedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: user?.fields.timezone as string, // Set your desired timezone
    }).format(new Date(date));

    const depositHtmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deposit Approved</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #030834;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            h1 {
                margin: 0;
            }
            .content {
                background-color: #ffffff;
                padding: 20px;
            }
            .deposit-details {
                background-color: #f0f0f0;
                border: 1px solid #ec3f77;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                background-color: #ec3f77;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                background-color: #f4f4f4;
                color: #333333;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Deposit Approved</h1>
            </div>
            <div class="content">
                <p>Dear [User's Name],</p>
                <p>Great news! Your deposit has been approved and credited to your account. Here are the details:</p>
                <div class="deposit-details">
                    <p><strong>Amount:</strong> ${amount}</p>
                    <p><strong>Transaction ID:</strong> ${transaction[0].id}</p>
                    <p><strong>Date Credited:</strong> ${formattedUpdatedDate}</p>
                </div>
                <p>Your account balance has been updated to reflect this deposit. You can now use these funds to invest on our platform.</p>
                <p>If you have any questions or notice any discrepancies, please don't hesitate to contact our support team.</p>
                <a href="https://swisspipsai.com/dashboard" class="button">View Account Balance</a>
            </div>
            <div class="footer">
                <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Check if it's the first approved deposit
    const approvedDeposits = await deposits
      .select({
        filterByFormula: `AND({user_id} = '${user_id}', {status} = "Approved")`,
      })
      .firstPage();

    console.log("Approved Deposits:", approvedDeposits);

    if (approvedDeposits.length === 1) {
      // Fetch referral record
      const referral = await referrals
        .select({
          filterByFormula: `AND({referred_user_id} = '${user_id}', {status} = "Pending")`,
        })
        .firstPage();

    //   console.log("Referral Record:", referral);

      if (referral.length) {
        const referrerId = referral[0]?.fields.referrer_id;
        const referredUserId = referral[0]?.fields.referred_user_id;

        const referralPercent = referral[0]?.fields.payout_percentage as number;
        // console.log(referralPercent);

        // Use referralPercent directly as it is already in percentage format
        const percentagePayout = referralPercent || 0;

        // console.log("Referrer ID:", referrerId);
        // console.log("Referral Percentage Payout:", percentagePayout);

        const referrer = await users.find(referrerId as string);
        const referredUser = await users.find(referredUserId as string);
        const referrerName = `${referrer?.fields.first_name} ${referrer?.fields.last_name}`;
        const referrerUserName = `${referredUser?.fields.first_name} ${referredUser?.fields.last_name}`;

        // console.log("Referrer Record:", referrer);

        if (referrer && percentagePayout > 0) {
          const referralBonus = depositAmount * percentagePayout; // Calculate bonus using percentage payout directly
          const ReferralEarnings = referrer.fields.referral_earnings as number;
          const newReferralEarnings = (ReferralEarnings || 0) + referralBonus;

        //   console.log("Referral Bonus:", referralBonus);

          // Update referrer's referral_earnings
          await users.update(referrerId as string, {
            referral_earnings: newReferralEarnings,
          });

          // Update referral record
          await referrals.update(referral[0].id, {
            status: "Verified",
            bonus_amount: referralBonus, // Log the bonus amount paid to the referrer
          });

          const referralHtmlContent = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Referral Verified - Bonus Credited!</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background-color: #030834;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        h1 {
                            margin: 0;
                        }
                        .content {
                            background-color: #ffffff;
                            padding: 20px;
                        }
                        .referral-details {
                            background-color: #f0f0f0;
                            border: 1px solid #ec3f77;
                            border-radius: 5px;
                            padding: 15px;
                            margin: 20px 0;
                        }
                        .button {
                            display: inline-block;
                            background-color: #ec3f77;
                            color: #ffffff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            color: #333333;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Referral Verified - Bonus Credited!</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${referrerName},</p>
                            <p>Great news! Your referral has been verified and your bonus has been credited to your account. Here are the details:</p>
                            <div class="referral-details">
                                <p><strong>Referred User:</strong> ${referrerUserName}</p>
                                <p><strong>Bonus Amount:</strong> ${referralBonus}</p>
                            </div>
                            <p>Thank you for helping our community grow. Keep referring friends and earning more bonuses!</p>
                            <p>Remember, you can earn a bonus for each new user you refer who completes the verification process.</p>
                            <a href="https://swisspipsai.com/dashboard/refer&earn" class="button">View Your Bonuses</a>
                        </div>
                        <div class="footer">
                            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>

                `;

          const mailOptions = {
            from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
            to: referrer?.fields.email as string,
            subject: "Referral Verified - Bonus Credited!",
            html: referralHtmlContent,
          };

          transporter.verify(function (error, success) {
            if (error) {
              console.log(`here is the error: ${error}`);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

          await transporter.sendMail(mailOptions);
        }
      }
    }

    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: user?.fields.email as string,
      subject: "Deposit Approved",
      html: depositHtmlContent,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(mailOptions);
    // console.log(result.response);

    if (result.response.includes("Ok")) {
      return Response.json({ message: "Deposit Approved." }, { status: 200 });
    } else {
      return Response.json(
        { error: "Something went wrong, please try again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error approving deposit:", error);
    return Response.json({ error: "Error approving deposit" }, { status: 200 });
  }
}
