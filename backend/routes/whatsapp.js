const accountSid = "ACfd28138f8050da2a2fcf21ab7d58b2b3";
const authToken = "c236bc4719c8c3c19bbfec3a74c6ff6b";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Your appointment is coming up on July 21 at 3PM",
    from: "whatsapp:+919307168315",
    to: "whatsapp:+919273075103",
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err))
  .done();
