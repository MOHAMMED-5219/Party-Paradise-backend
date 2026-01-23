const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Party Paradise" <${process.env.EMAIL_USER}>`,
      to, // 👈 dynamic email
      subject,
      text,
    });

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};

module.exports = sendEmail;
