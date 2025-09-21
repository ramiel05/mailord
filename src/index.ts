import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { makeupByEllieContact } from "./makeup-by-ellie-contact";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS request from origin:", origin);
      console.log("ALLOWED_ORIGIN env var:", process.env.ALLOWED_ORIGIN);

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (process.env.ALLOWED_ORIGIN && origin !== process.env.ALLOWED_ORIGIN) {
        return callback(new Error("Not allowed by CORS"));
      }

      callback(null, true);
    },
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
