import { type Request, type Response } from "express";
import { sendMail } from "./mailer";

interface Body {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  service: string; // TODO union
  totalPeopleMakeup: number;
  totalpeopleHair: number;
  timeToFinishBy: string;
  addressForService: string;
  additionalInformation: string;
}

export const makeupByEllieContact = async (req: Request<any, any, Body>, res: Response) => {
  const {
    name,
    phone,
    email,
    eventDate,
    service,
    totalPeopleMakeup,
    totalpeopleHair,
    timeToFinishBy,
    addressForService,
    additionalInformation,
  } = req.body;

  console.log({
    name,
    phone,
    email,
    eventDate,
    service,
    totalPeopleMakeup,
    totalpeopleHair,
    timeToFinishBy,
    addressForService,
    additionalInformation,
  });

  if (
    !name ||
    !phone ||
    !email ||
    !eventDate ||
    !service ||
    !totalPeopleMakeup ||
    !totalpeopleHair ||
    !timeToFinishBy ||
    !addressForService
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const message = JSON.stringify({
    name,
    phone,
    email,
    eventDate,
    service,
    totalPeopleMakeup,
    totalpeopleHair,
    timeToFinishBy,
    addressForService,
    additionalInformation,
  });

  try {
    await sendMail({ fromName: name, fromEmail: email, message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
};
