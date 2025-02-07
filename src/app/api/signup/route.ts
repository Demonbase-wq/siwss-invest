import bcrypt from "bcryptjs";
import { referrals, users } from "@/lib/airtable";
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
})

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  pincode: string;
  dob: Date;
  password: string;
  country: string;
  state: string;
  address: string;
  img: string;
  referralCode: string;
  timezone: string;
}

function createTemplate(name: any, pincode: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
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
        .pincode {
            background-color: #f0f0f0;
            border: 1px solid #ec3f77;
            border-radius: 5px;
            padding: 10px;
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
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
            <h1>Welcome to Our Platform</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for signing up with us. We're excited to have you on board!</p>
            <p>Your account has been successfully created. To complete your registration, please use the following pincode:</p>
            <div class="pincode">${pincode}</div>
            <p>Please enter this pincode on our website to verify your account.</p>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <a href="https://swisspipsai.com" class="button">Visit Our Platform</a>
        </div>
        <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
}

export async function POST(request: Request) {
  const req: FormData = await request.json();
  
  try {
    const dobString = new Date(req.dob).toISOString().split("T")[0];

    const hashedPassword = await bcrypt.hash(req.password, 10);
    const formattedEmail = req.email.toLowerCase();

    const userData = {
      first_name: req.first_name,
      last_name: req.last_name,
      email: formattedEmail,
      phone: req.phone,
      country: req.country,
      dob: dobString,
      address: req.address,
      password: hashedPassword,
      pincode: req.pincode,
      state: req.state,
      img: req.img,
      timezone: req.timezone,
    };

    const newUser = await users.create([
      {
        fields: userData,
      },
    ]);

    if (newUser && newUser.length > 0) {
      const newUserId = newUser[0].id; // Airtable record ID of the new user

      // Handle referral logic if a referral code is provided
      if (req.referralCode) {
        // Find the referrer by referral code
        const referrer = await users
          .select({
            filterByFormula: `{referral_code} = '${req.referralCode}'`,
          })
          .firstPage();

        if (referrer && referrer.length > 0) {
          const referrerId = referrer[0].id;

          // Add the referral record to the referrals table
          await referrals.create([
            {
              fields: {
                referrer_id: referrerId, // Linked field in Airtable
                referred_user_id: newUserId, // Linked field in Airtable
                bonus_amount: 0,
                payout_percentage: 0.2, // Bonus will be calculated upon deposit
              },
            },
          ]);
        }
      }

      const name = `${newUser[0].fields.first_name} ${newUser[0].fields.last_name}`

      // Send the welcome email
      transporter.verify(function (error, success) {
        if (error) {
          console.log(`here is the error: ${error}`);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      const mailOptions = {
        from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
        to: req.email,
        subject: "Welcome to Our Platform",
        html: createTemplate(name, req.pincode),
      };

      const result = await transporter.sendMail(mailOptions);

      if (result.response.includes("Ok")) {
        return Response.json({ success: true }, { status: 200 });
      } else {
        return Response.json(
          { error: "Error Signing Up." },
          { status: 500 }
        );
      }
    } 
  } catch (error) {
    console.log(error);
    return Response.json({ catchError: error }, { status: 200 });
  }
}

//     if (newUser && newUser.length > 0) {
//       transporter.verify(function (error, success) {
//         if (error) {
//           console.log(`here is the error: ${error}`);
//         } else {
//           console.log("Server is ready to take our messages");
//         }
//       });

//       const mailOptions = {
//         from: `CmTradingPro <no-reply@cmtradingpro.com>`,
//         to: req.email,
//         subject: "Welcome To CmTradingPro",
//         html: htmlContent,
//       };

//       transporter.verify(function (error, success) {
//         if (error) {
//           console.log(`here is the error: ${error}`);
//         } else {
//           console.log("Server is ready to take our messages");
//         }
//       });

//       const result = await transporter.sendMail(mailOptions);

//       if (result.response.includes("OK")) {
//         return Response.json({ success: true }, { status: 200 });
//       } else {
//         return Response.json(
//           { error: "Error logging in user." },
//           { status: 500 }
//         );
//       }
//     } else {
//       return Response.json({ error: "Error Signing Up." }, { status: 500 });
//     }
//   } catch (error) {
//     console.log(error);
//     return Response.json({ error: error });
//   }
// }
