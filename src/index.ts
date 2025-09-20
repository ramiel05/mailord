import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { makeupByEllieContact } from "./makeup-by-ellie-contact";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Mailer is running");
});

app.get("/health", (_, res) => {
  res.send("So healthy right now");
});

app.post("/makeup-by-ellie-contact", makeupByEllieContact);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Mailer listening on port ${port}`);
});
