import express from "express";
import dotenv from "dotenv";
import { sendMail } from "./mailer";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Mailer is running");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await sendMail({ fromName: name, fromEmail: email, message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Mailer listening on port ${port}`);
});
