const nodemailer = require("nodemailer");
const announcementTemplate = require("./announcementTemplate"); // import template

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});

async function sendEventMail(students, event) {
  // Replace placeholders with event values
  const htmlContent = announcementTemplate
    .replace(/{{title}}/g, event.title)
    .replace(/{{description}}/g, event.description)
    .replace(/{{date}}/g, new Date(event.date).toLocaleDateString());

  const mailOptions = {
    from: `"ITFT Announcement" <${process.env.EMAIL_USER}>`,
    to: students.join(","),
    subject: `📢 New Announcement: ${event.title}`,
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