import { investmentsTable, users } from "@/lib/airtable";
import { auth } from "../../../../auth";
import { DateTime } from "luxon";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string), // Convert string to number
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
//   debug: true, // Enable debug output
//   logger: true, // Log to console
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, amount, estimatedROI, duration } = await request.json();

  try {
    const userRecord = await users.find(session.user.id as string);

    if (!userRecord) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    const timezone = userRecord.fields.timezone || "UTC";

    // Calculate investment metrics
    const roi = estimatedROI / 100;
    const totalEarnings = amount + amount * roi;
    const netProfit = totalEarnings - amount;

    // Calculate start and end dates in the user's timezone
    const startDate = DateTime.now()
      .setZone(timezone as string)
      .startOf("day")
      .toUTC();
    const endDate = startDate.plus({ days: duration * 7 }); // Convert weeks to days

    // Save investment to Airtable
    const investmentRecord = await investmentsTable.create({
      user_id: session.user.id,
      name: name,
      roi: roi,
      amount: amount,
      duration: duration * 7, // Convert weeks to days
      start_date: startDate.toISO() as string, // Store in UTC
      end_date: endDate.toISO() as string, // Store in UTC
      total_earnings: totalEarnings,
      net_profit: netProfit,
    });

    const investmentId = investmentRecord.id;
    const user_name = `${userRecord.fields.first_name} ${userRecord.fields.last_name}`;
    const start_date = investmentRecord?.fields.start_date as string;
    const end_date = investmentRecord?.fields.end_date as string;

    const formattedStartDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: userRecord?.fields.timezone as string, // Set your desired timezone
    }).format(new Date(start_date));

    const formattedEndDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: userRecord?.fields.timezone as string, // Set your desired timezone
    }).format(new Date(end_date));

    const htmlContent = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Investment Created</title>
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
                        .investment-details {
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
                                <h1>New Investment Created</h1>
                            </div>
                            <div class="content">
                                <p>Dear ${user_name},</p>
                                <p>Congratulations on creating a new investment! We're excited to confirm that your investment has been successfully set up. Here are the details of your new investment:</p>
                                <div class="investment-details">
                                    <p><strong>Investment ID:</strong> ${investmentId}</p>
                                    <p><strong>Investment Type:</strong> ${investmentRecord?.fields.name}</p>
                                    <p><strong>Amount Invested:</strong> ${amount}</p>
                                    <p><strong>Start Date:</strong> ${formattedStartDate}</p>
                                    <p><strong>Expected End Date:</strong> ${formattedEndDate}</p>
                                    <p><strong>Expected Return:</strong> ${totalEarnings}</p>
                                </div>
                                <p>Your investment has been successfully initiated and our team will manage it according to the selected investment strategy. You can track the performance of your investment at any time through your account dashboard.</p>
                                <p>Here are a few important points to remember:</p>
                                <ul>
                                    <li>Regular updates on your investment performance will be provided in your account.</li>
                                    <li>Any dividends or returns will be credited to your account as per the terms of the investment.</li>
                                    <li>If you have any questions or need to make changes to your investment, please contact our support team.</li>
                                </ul>
                                <p>We appreciate your trust in our platform for your investment needs. If you have any questions or need further assistance, please don't hesitate to reach out to our customer support team.</p>
                                <a href="https://swisspipsai.com/dashboard/investments/investment?id=${investmentId}" class="button">View Investment Details</a>
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
                                <p>This email is for informational purposes only and does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions.</p>
                            </div>
                        </div>
                    </body>
            </html>

`;
    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: userRecord?.fields.email as string,
      subject: "New Investment Created",
      html: htmlContent,
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
      return Response.json(
        { message: "Investment created successfully!" },
        { status: 200 }
      );
    } else {
      return Response.json({ error: "Something went wrong, please try again." }, { status: 200 });
    }
  } catch (error) {
    console.error("Error creating investment:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
