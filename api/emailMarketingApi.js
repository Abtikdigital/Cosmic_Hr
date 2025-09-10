import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

// ENV VARIABLES
const { SMTP_HOST_NAME, SMTP_PORT, SECURE, MONGODB_URI, SMTP_MAIL, SMTP_PASS } =
  process.env;

// ====================== DB CONNECTION ======================
let cached = null;
const dbConnection = async () => {
  if (cached) return cached;
  cached = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return cached;
};

// ====================== SCHEMA ======================
const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);

const SubscriberModel =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

// ====================== VALIDATION ======================
const subscriberValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
});

// ====================== MAILER ======================
const transporter = nodemailer.createTransport({
  //   host: SMTP_HOST_NAME,
  //   port: SMTP_PORT,
  //   secure: SECURE === "true",
  //   auth: {
  //     user: SMTP_MAIL,
  //     pass: SMTP_PASS,
  //   },
  service: "gmail",
  auth: {
    user: "jay.abtikservice@gmail.com",
    pass: "loqa snky cwaa xady",
  },
});

// Firm Template (Admin notification)
const firmTemplate = (email) => `
  <h2>📩 New Newsletter Subscriber</h2>
  <p><strong>Email:</strong> ${email}</p>
`;

// User Template (Thank you)
const userTemplate = (email) => `
  <h2>✅ Subscription Confirmed</h2>
  <p>Dear Subscriber,</p>
  <p>Thank you for subscribing to <strong>Cosmic HR Solutions</strong> newsletter!</p>
  <p>You’ll now receive the latest updates, job alerts, and HR insights directly in your inbox.</p>
  <br/>
  <p>Regards,<br/>Cosmic HR Solutions Team</p>
`;

// ====================== HANDLER ======================
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  await dbConnection();

  try {
    const { email } = req.body;

    // Validate
    const { error } = subscriberValidationSchema.validate({ email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if subscriber exists
    const exists = await SubscriberModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    // Save to DB
    const newSub = new SubscriberModel({ email });
    await newSub.save();

    // Send Emails
    await Promise.all([
      transporter.sendMail({
        from: SMTP_MAIL,
        to: SMTP_MAIL, // Admin
        subject: "New Newsletter Subscription",
        html: firmTemplate(email),
      }),
      transporter.sendMail({
        from: SMTP_MAIL,
        to: email, // User
        subject: "Subscription Confirmed - Cosmic HR Solutions",
        html: userTemplate(email),
      }),
    ]);

    return res
      .status(201)
      .json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    console.error("Error in Email Marketing API:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
