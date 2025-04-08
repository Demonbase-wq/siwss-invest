// import bcrypt from "bcryptjs";
// import { users } from "@/lib/airtable";
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

function createUserEmailTemplate(name: string) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
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
          .button {
            display: inline-block;
            background-color: #ec3f77;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
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
            <h1>Thank You for Contacting Us</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and appreciate you taking the time to contact us.</p>
            <p>Our support team will review your inquiry and get back to you as soon as possible. We typically respond within 24-48 hours.</p>
            <p>If you have any additional information to add to your request, please don't hesitate to reply to this email.</p>
            <a href="https://swisspipsai.com" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}

function createSupportEmailTemplate(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
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
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: bold;
            color: #030834;
          }
          .value {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 3px;
            border-left: 4px solid #ec3f77;
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
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  try {
    const supportMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SUPPORT_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: createSupportEmailTemplate(name, email, subject, message),
    };

    const userMailOptions = {
      from: `"Swiss Pips AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Us",
      html: createUserEmailTemplate(name),
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(supportMailOptions);

    // console.log(result.response);

    if (result.response.includes("Ok")) {
      const resultTwo = await transporter.sendMail(userMailOptions);
      if (resultTwo.response.includes("Ok")) {
        return Response.json(
          { message: "Message sent successfully, check your email!" },
          { status: 200 }
        );
      } else {
        return Response.json(
          { error: "Something went wrong, please try again" },
          { status: 200 }
        );
      }
    } else {
      return Response.json(
        { error: "Something went wrong, please try again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Something went wrong, please try again" },
      { status: 200 }
    );
  }
}
