import { SMTPClient } from "emailjs";
import { config } from "dotenv";
config({ path: "../.env" });

const password = process.env.Application_Specific_Password;
console.log(password);

export default async function sendEmail({
  toEmail = undefined,
  content = undefined,
  subject = undefined,
  otp = undefined,
}) {
  const ToEmail = String(toEmail);
  const client = new SMTPClient({
    user: "mangesh2003vispute@gmail.com",
    password: `${password}`,
    host: "smtp.gmail.com",
    ssl: true,
  });

  try {
    const message = await client.sendAsync({
      text: content,
      from: "mangesh2003vispute@gmail.com",
      to: ToEmail,
      subject: subject,
    });
    console.log(message);
  } catch (err) {
    console.error(err);
  }
}
// sendEmail({
//   toEmail: "mangesh2003vispute@gmail.com",
//   content: `
// Dear [User],

// Congratulations! You have successfully registered on TaskDailyPro, and we're thrilled to have you join our community. Get ready to embark on a journey of personal and professional growth. To make the most of your experience, here are the steps to guide you through the platform:

// 1. Complete Your Profile:
// Log in to your TaskDailyPro account.
// Navigate to the profile section and ensure all your information is up-to-date.

// 2. Set Your Goals:
// Visit the goals section to define your aspirations and objectives.
// Clearly outline what you want to achieve in the short and long term.

// 3. Connect with Mentors:
// Explore the mentorship section within your goals.
// Identify mentors relevant to your goals and add them to your list.

// 4.Analyze and Centralize Processes:
// Review the processes shared by different mentors for the same goal.
// Centralize the most effective processes in the process section under goals.

// 5. Verify Processes:
// Validate the central process by consulting multiple mentors.
// Once confirmed, document it in the process section as your go-to guide.

// 6. Task Division and Tracking:
// Break down your goals into tasks in the ADD task section.
// Categorize tasks as Daily, Monthly, and Yearly to manage your workload effectively.

// 7. Monitor Efficiency:
// Keep track of task status and overall efficiency in the profile logs section.
// Strive to improve your efficiency daily and enhance productivity.
// For any technical issues or feedback, feel free to reach out to us:

// WhatsApp: +919307168315
// Email: mangesh2003vispute@gmail.com
// We are here to support you on your journey to success. Best of luck!

// Warm regards,

// Mangesh vispute,
// TaskDailyPro Support Team`,
//   subject: "Welcome to TaskDailyPro - Your Registration is Successful!",
//   otp: 123456,
// });
