import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const parseMessage = (message: string) => {
  let parsed: Record<string, any>;
  try {
    return (parsed = JSON.parse(message));
  } catch (err) {
    console.error("Invalid JSON in message:", err);
    return { error: "Failed to parse message JSON" };
  }
};

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function sendMail({
  fromName,
  fromEmail,
  message,
}: {
  fromName: string;
  fromEmail: string;
  message: string;
}) {
  const parsed = parseMessage(message);

  const htmlBody = `
    <div style="font-family: sans-serif; font-size: 14px;">
      <h2>Makeup by Ellie Website Contact Form Submission</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        ${Object.entries(parsed)
          .map(([key, value]) => {
            const safeLabel = escapeHtml(key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()));
            const safeValue = value ? escapeHtml(String(value)) : "<i>(not provided)</i>";
            return `
              <tr>
                <td style="font-weight: bold; vertical-align: top;">${safeLabel}:</td>
                <td>${safeValue}</td>
              </tr>
            `;
          })
          .join("")}
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "New Contact Form Submission",
    text: message,
    html: htmlBody,
  });
}
