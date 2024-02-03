import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.TWILIO_PHONE;
console.log("this is phone ", phone);
console.log("this is accountSid ", accountSid);
console.log("this is authToken ", authToken);
import twilio from "twilio";
const client = twilio(accountSid, authToken);

export default function sendSms(otp, Tophone) {
  const ToPhone = String(Tophone);
  client.messages
    .create({
      body: `Your otp for TaskDailyPro Password Reset: ${otp}`,
      from: `${phone}`,
      to: ToPhone,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}
