const { sendEmail } = require("../services/emailService");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `[CaterEase Contact] ${subject}`,
      text: `You have a new message from the CaterEase contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nReply directly to: ${email}`,
    });

    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendContactMessage };
