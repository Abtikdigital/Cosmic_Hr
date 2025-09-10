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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0; font-family: Arial, sans-serif; background:#f0f6fc; padding:30px;">
        <div style="max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#007BFF,#00AEEF); padding:30px; text-align:center; color:#fff; font-size:26px; font-weight:700;">
            Cosmic HR Solutions
            <div style="font-size:16px; font-weight:400; margin-top:5px;">📩 New Contact Form Submission</div>
          </div>
          
          <!-- Content -->
          <div style="padding:30px; color:#333;">
            <p style="font-size:15px; margin-bottom:20px;">You have received a new contact form submission with the following details:</p>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr>
                <th style="background:#007BFF; color:#fff; padding:12px; text-align:left; width:30%;">Name</th>
                <td style="background:#f9f9f9; padding:12px;">${name}</td>
              </tr>
              <tr>
                <th style="background:#007BFF; color:#fff; padding:12px; text-align:left;">Email</th>
                <td style="background:#eef5fb; padding:12px;"><a href="mailto:${email}" style="color:#007BFF; text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <th style="background:#007BFF; color:#fff; padding:12px; text-align:left;">Number</th>
                <td style="background:#f9f9f9; padding:12px;"><a href="tel:+91${number}" style="color:#007BFF; text-decoration:none;">${number}</a></td>
              </tr>
              <tr>
                <th style="background:#007BFF; color:#fff; padding:12px; text-align:left;">Message</th>
                <td style="background:#eef5fb; padding:12px;">${message}</td>
              </tr>
            </table>
          </div>
          
          <!-- Footer -->
          <div style="text-align:center; padding:20px; background:#f7faff; font-size:13px; color:#666; border-top:1px solid #ddd;">
            This email was auto-generated. Please do not reply.
          </div>
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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0; font-family: Arial, sans-serif; background:#f0f6fc; padding:30px;">
        <div style="max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#007BFF,#00AEEF); padding:30px; text-align:center; color:#fff; font-size:26px; font-weight:700;">
            Cosmic HR Solutions
            <div style="font-size:16px; font-weight:400; margin-top:5px;">✅ Thank You for Contacting Us</div>
          </div>
          
          <!-- Content -->
          <div style="padding:30px; color:#333;">
            <div style="background:#eef5fb; border-left:4px solid #007BFF; padding:15px; margin-bottom:20px; font-size:15px;">
              Dear ${name}, thank you for reaching out to <strong>Cosmic HR Solutions</strong>!<br>
              We’ve received your message and our team will get back to you within 24-48 hours.
            </div>
            <p style="margin-bottom:20px;">Meanwhile, feel free to explore our website and services.</p>
            <center>
              <a href="https://www.cosmichrsolutions.com" 
                 style="display:inline-block; padding:12px 24px; background:linear-gradient(135deg,#007BFF,#00AEEF); 
                        color:#fff; border-radius:6px; text-decoration:none; font-weight:bold; font-size:15px;">
                 Visit Our Website
              </a>
            </center>
          </div>
          
          <!-- Footer -->
          <div style="text-align:center; padding:20px; background:#f7faff; font-size:13px; color:#666; border-top:1px solid #ddd;">
            <div style="margin-bottom:8px;">
              <a href="#" style="margin:0 8px; text-decoration:none; color:#007BFF;">Facebook</a> • 
              <a href="#" style="margin:0 8px; text-decoration:none; color:#007BFF;">Instagram</a> • 
              <a href="#" style="margin:0 8px; text-decoration:none; color:#007BFF;">LinkedIn</a>
            </div>
            © 2025 Cosmic HR Solutions. All rights reserved.
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
