import { SMTPClient } from "emailjs";
import { config } from "dotenv";
config({ path: "../.env" });

const password = process.env.Application_Specific_Password;
console.log(password);
export default async function sendEmail(otp, toEmail) {
  const ToEmail = String(toEmail);
  const client = new SMTPClient({
    user: "mangesh2003vispute@gmail.com",
    password: `${password}`,
    host: "smtp.gmail.com",
    ssl: true,
  });

  try {
    const message = await client.sendAsync({
      text: `Hello sir/mam,

      Your TaskDailyPro OTP for password reset is: ${otp}. Please use this code to reset your password. This code is valid for the next 10 minutes. If you did not request this password reset, please ignore this message.
      
      Thank you,
      TaskDailyPro Support
      `,
      from: "mangesh2003vispute@gmail.com",
      to: ToEmail,
      subject: "OTP for password reset",
    });
    console.log(message);
  } catch (err) {
    console.error(err);
  }
}
