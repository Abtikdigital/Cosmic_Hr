import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

// ENV VARIABLES
const { SMTP_HOST_NAME, SMTP_PORT, SECURE, MONGODB_URI, SMTP_MAIL, SMTP_PASS } =
  process.env;

// MONGODB CONNECTION
let cached = null;
const dbConnection = async () => {
  try {
    if (cached) {
      return cached;
    }
    cached = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      tls: true,
    });
    return cached;
  } catch (error) {
    console.log("Error While Connecting Database", error);
  }
};

// SCHEMA
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "* Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    number: {
      type: Number,
      required: [true, "* Number is required"],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

// MODEL
const ContactModel =
  mongoose.models.contactModel || mongoose.model("contactModel", contactSchema);

// VALIDATION
const contactValidationSchema = joi.object({
  name: joi.string().required().messages({
    "string.base": "* Name Must Be String",
    "any.required": "* Name Is Required",
  }),
  number: joi.number().required().messages({
    "number.base": "* Number Must Be Number",
    "any.required": "* Number Is Required",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "* Email Must Be String",
      "any.required": "* Email is required",
    }),
});

// TRANSPORTER
const transporter = nodemailer.createTransport({
  //   host: SMTP_HOST_NAME,
  //   auth: {
  //     user: SMTP_MAIL,
  //     pass: SMTP_PASS,
  //   },
  //   port: SMTP_PORT,
  //   secure: SECURE,
  service: "gmail",
  auth: {
    user: "jay.abtikservice@gmail.com",
    pass: "loqa snky cwaa xady",
  },
});

// SEND MAIL
const sendMail = async (from, to, subject, template) => {
  try {
    let info = await transporter.sendMail({
      to,
      from,
      subject,
      html: template,
    });
    if (info) {
      console.log("Mail Sent Successfully");
    }
  } catch (error) {
    console.log("Error While Sending Mail", error);
  }
};

// Firm Template (Admin Email)
const firmTemplate = (data) => {
  let { name, email, number, message } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin:0; font-family: Arial, sans-serif; background:#f0f6fc; padding:30px; }
          .wrapper { max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1); }
          .header { background:linear-gradient(135deg,#007BFF,#00AEEF); padding:30px; text-align:center; color:#fff; font-size:28px; font-weight:700; }
          .content { padding:30px; color:#333; }
          h2 { font-size:22px; margin-bottom:15px; color:#007BFF; }
          p { margin-bottom:20px; line-height:1.6; }
          table { width:100%; border-collapse:collapse; margin-top:20px; }
          th { background:#007BFF; color:#fff; padding:12px; text-align:left; width:30%; }
          td { background:#f9f9f9; padding:12px; }
          tr:nth-child(even) td { background:#eef5fb; }
          .footer { text-align:center; padding:20px; background:#f7faff; font-size:13px; color:#666; border-top:1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">Cosmic HR Solutions</div>
          <div class="content">
            <h2>📩 New Contact Form Submission</h2>
            <p>You have received a new contact form submission with the following details:</p>
            <table>
              <tr><th>Name</th><td>${name}</td></tr>
              <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><th>Number</th><td><a href="tel:+91${number}">${number}</a></td></tr>
              <tr><th>Message</th><td>${message}</td></tr>
            </table>
          </div>
          <div class="footer">This email was auto-generated. Please do not reply.</div>
        </div>
      </body>
    </html>
  `;
};

// User Template (Thank You Email)
const userTemplate = (data) => {
  let { name } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin:0; font-family: Arial, sans-serif; background:#f0f6fc; padding:30px; }
          .wrapper { max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1); }
          .header { background:linear-gradient(135deg,#007BFF,#00AEEF); padding:30px; text-align:center; color:#fff; font-size:28px; font-weight:700; }
          .content { padding:30px; color:#333; }
          h2 { font-size:22px; margin-bottom:15px; color:#007BFF; }
          p { margin-bottom:20px; line-height:1.6; }
          .highlight { background:#eef5fb; border-left:4px solid #007BFF; padding:15px; margin:20px 0; }
          .button { display:inline-block; padding:12px 24px; background:linear-gradient(135deg,#007BFF,#00AEEF); color:#fff; border-radius:6px; text-decoration:none; font-weight:bold; }
          .footer { text-align:center; padding:20px; background:#f7faff; font-size:13px; color:#666; border-top:1px solid #ddd; }
          .social a { margin:0 8px; text-decoration:none; color:#007BFF; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">Cosmic HR Solutions</div>
          <div class="content">
            <h2>✅ Thank You for Contacting Us</h2>
            <p class="highlight">Dear ${name}, thank you for reaching out to <strong>Cosmic HR Solutions</strong>! We’ve received your message and our team will get back to you within 24-48 hours.</p>
            <p>Meanwhile, feel free to explore our website and services.</p>
            <center><a href="https://www.cosmichrsolutions.com" class="button">Visit Our Website</a></center>
          </div>
          <div class="footer">
            <div class="social">
              <a href="#">Facebook</a> • 
              <a href="#">Instagram</a> • 
              <a href="#">LinkedIn</a>
            </div>
            <div>© 2025 Cosmic HR Solutions. All rights reserved.</div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// MAIN HANDLER
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only POST Method Is Allowed" });
  }
  try {
    await dbConnection();
    let { name, number, email, message } = req.body;
    let { error } = contactValidationSchema.validate({ name, number, email });
    if (error) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

    let isDataExist = await ContactModel.findOne({
      $or: [{ email }, { number }],
    });
    if (isDataExist) {
      return res
        .status(409)
        .json({ isSuccess: false, message: "Data Already Exists" });
    }

    let newContact = new ContactModel(req.body);
    let isSaved = await newContact.save();
    if (isSaved) {
      await Promise.all([
        sendMail(
          SMTP_MAIL,
          email,
          "Thanks for Contacting Cosmic HR Solutions",
          userTemplate(req.body)
        ),
        sendMail(
          SMTP_MAIL,
          SMTP_MAIL,
          `New Contact Request from ${name}`,
          firmTemplate(req.body)
        ),
      ]);
      res
        .status(201)
        .json({ isSuccess: true, message: "New Contact Saved Successfully" });
    } else {
      res
        .status(400)
        .json({ isSuccess: false, message: "Error While Saving Contact" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

export default handler;
