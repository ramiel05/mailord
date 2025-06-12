import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail({
  fromName,
  fromEmail,
  message,
}: {
  fromName: string;
  fromEmail: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "New Contact Form Submission",
    text: message,
  });
}
