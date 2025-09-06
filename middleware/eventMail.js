const nodemailer = require("nodemailer");
const eventTemplate = require("./eventTemplate"); // import template

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});

async function sendEventMail(students, event) {
  // Replace placeholders with event values
  const htmlContent = eventTemplate
    .replace(/{{title}}/g, event.title)
    .replace(/{{description}}/g, event.description)
    .replace(/{{date}}/g, new Date(event.date).toLocaleDateString())
    .replace(/{{location}}/g, event.location)
    .replace(/{{registrationLink}}/g, event.registrationLink)
    .replace(/{{status}}/g, event.status)
    .replace(/{{poster}}/g, event.poster)
    .replace(/{{type}}/g, event.type);

  const mailOptions = {
    from: `"ITFT Events" <${process.env.EMAIL_USER}>`,
    to: students.join(","),
    subject: `📢 New Event: ${event.title}`,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Event mail sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


module.exports = sendEventMail