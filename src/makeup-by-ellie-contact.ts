import { type Request, type Response } from "express";
import { sendMail } from "./mailer";

interface Body {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  totalPeopleMakeup: number;
  whoRequiresMakeup: string;
  ceremonyTime: string;
  ceremonyVenue: string;
  receptionTime: string;
  receptionVenue: string;
  photographerStartTime: string;
  gettingReadyLocation: string;
  timeToFinishBy: string;
  notes?: string;
}

export const makeupByEllieContact = async (req: Request<any, any, Body>, res: Response) => {
  const {
    name,
    phone,
    email,
    eventDate,
    totalPeopleMakeup,
    whoRequiresMakeup,
    ceremonyTime,
    ceremonyVenue,
    receptionTime,
    receptionVenue,
    photographerStartTime,
    gettingReadyLocation,
    timeToFinishBy,
    notes,
  } = req.body;

  console.log({
    name,
    phone,
    email,
    eventDate,
    totalPeopleMakeup,
    whoRequiresMakeup,
    ceremonyTime,
    ceremonyVenue,
    receptionTime,
    receptionVenue,
    photographerStartTime,
    gettingReadyLocation,
    timeToFinishBy,
    notes,
  });

  if (
    !name ||
    !phone ||
    !email ||
    !eventDate ||
    !totalPeopleMakeup ||
    !whoRequiresMakeup ||
    !ceremonyTime ||
    !ceremonyVenue ||
    !receptionTime ||
    !receptionVenue ||
    !photographerStartTime ||
    !gettingReadyLocation ||
    !timeToFinishBy
  ) {
    return res.status(400).json({ error: "Some required fields are missing." });
  }

  const message = JSON.stringify({
    name,
    phone,
    email,
    eventDate,
    totalPeopleMakeup,
    whoRequiresMakeup,
    ceremonyTime,
    ceremonyVenue,
    receptionTime,
    receptionVenue,
    photographerStartTime,
    gettingReadyLocation,
    timeToFinishBy,
    notes,
  });

  try {
    await sendMail({ fromName: name, fromEmail: email, message });
    res.status(200).json({ success: true });
    console.log("Email sent");
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
};

// TODO an autmoated thank you email response

// e.g. from netlify functions

// ```ts
// import formData from "form-data";
// import Mailgun from "mailgun.js";
// import Airtable from "airtable";

// const sendThankYouEmail = async ({ email }) => {
//   console.log('Sending the email');
//   const { MG_API_KEY: apiKey, MG_DOMAIN: domain } = process.env;
//   const mailgun = new Mailgun(formData).client({
//     username: 'api',
//     key: apiKey,
//   });

//   const mailData = {
//     from: `Stefan Judis stefan@${domain}`,
//     to: email,
//     subject: 'Thank you for your interest',
//     text: "I'll come back to you asap!",
//   };

//   await mailgun.messages.create(domain, mailData);
// };

// const saveUser = async ({ name, email, message }) => {
//   const { AT_API_KEY: apiKey, AT_BASE, AT_TABLE } = process.env;

//   Airtable.configure({
//     apiKey,
//   });

//   const base = Airtable.base(AT_BASE);
//   const table = base(AT_TABLE);
//   await table.create({ name, email, message });
// };

// export default async (request, context) => {
//   try {
//     const data = await request.json();

//     await sendThankYouEmail(data);

//     if (data.receiveUpdates) {
//       await saveUser(data);
//     }

//     return Response.json({ message: "Let's become serverless conductors!!!" });
//   } catch (error) {
//     console.log(error);
//     return Response.json({ error: 'Failed sending email' }, { status: 500 });
//   }
// };
// ```
