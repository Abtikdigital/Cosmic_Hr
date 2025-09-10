import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

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
const jobSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    employmentStatus: { type: String, required: true, trim: true },
    salary: { type: String, required: true, trim: true },
    notes: { type: String },
    resume: { type: String }, // file path
  },
  { timestamps: true }
);

const JobModel =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobSchema);

// ====================== VALIDATION ======================
const jobValidationSchema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  jobTitle: joi.string().required(),
  experience: joi.string().required(),
  location: joi.string().required(),
  employmentStatus: joi.string().required(),
  salary: joi.string().required(),
  notes: joi.string().allow(""),
});

// ====================== MAILER ======================
const transporter = nodemailer.createTransport({
  // For Gmail
  service: "gmail",
  auth: {
    user: "jay.abtikservice@gmail.com",
    pass: "loqa snky cwaa xady", // ⚠️ Use app password
  },
});

// Firm Email Template
const firmTemplate = (data) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Cosmic HR Solutions</h1>
          <p style="margin: 5px 0 0; font-size: 16px;">📩 New Job Application Received</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="font-weight: bold; color: #333;">Name:</td>
              <td style="color: #555;">${data.fullName}</td>
            </tr>
            <tr style="background: #f0f6ff;">
              <td style="font-weight: bold; color: #333;">Email:</td>
              <td style="color: #555;">${data.email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Phone:</td>
              <td style="color: #555;">${data.phone}</td>
            </tr>
            <tr style="background: #f0f6ff;">
              <td style="font-weight: bold; color: #333;">Job Title:</td>
              <td style="color: #555;">${data.jobTitle}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Experience:</td>
              <td style="color: #555;">${data.experience}</td>
            </tr>
            <tr style="background: #f0f6ff;">
              <td style="font-weight: bold; color: #333;">Location:</td>
              <td style="color: #555;">${data.location}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Employment Status:</td>
              <td style="color: #555;">${data.employmentStatus}</td>
            </tr>
            <tr style="background: #f0f6ff;">
              <td style="font-weight: bold; color: #333;">Expected Salary:</td>
              <td style="color: #555;">${data.salary}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #333;">Notes:</td>
              <td style="color: #555;">${data.notes || "N/A"}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
};

// User Email Template
const userTemplate = (data) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #007bff; color: #ffffff; text-align: center; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Cosmic HR Solutions</h1>
          <p style="margin: 5px 0 0; font-size: 16px;">✅ Thank You for Applying</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; color: #333; line-height: 1.6;">
          <p>Dear <strong>${data.fullName}</strong>,</p>
          <p>Thank you for applying to <strong style="color:#007bff;">Cosmic HR Solutions</strong> for the role of <strong>${data.jobTitle}</strong>.</p>
          <p>Our HR team will review your application and get back to you soon.</p>
          <p style="margin-top: 20px;">Regards,<br>
          <strong style="color:#007bff;">Cosmic HR Solutions Team</strong></p>
        </td>
      </tr>
    </table>
  </div>
  `;
};


// ====================== HANDLER ======================
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  await dbConnection();

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    // Normalize Formidable fields (convert arrays -> strings)
    const data = {};
    for (const key in fields) {
      data[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    }

    const { error } = jobValidationSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Resume Handling
    let resumePath = null;
    if (files.resume) {
      const oldPath = files.resume.filepath || files.resume.path;
      const newPath = `./uploads/${files.resume.originalFilename}`;
      fs.renameSync(oldPath, newPath);
      resumePath = newPath;
    }

    // Save to DB
    const newJob = new JobModel({ ...data, resume: resumePath });
    await newJob.save();

    // Send Emails
    await Promise.all([
      transporter.sendMail({
        from: SMTP_MAIL,
        to: SMTP_MAIL,
        subject: `New Job Application: ${data.jobTitle}`,
        html: firmTemplate(data),
      }),
      transporter.sendMail({
        from: SMTP_MAIL,
        to: data.email,
        subject: "Thank You for Applying - Cosmic HR Solutions",
        html: userTemplate(data),
      }),
    ]);

    return res
      .status(201)
      .json({ success: true, message: "Application submitted successfully" });
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // Needed for file upload
  },
};
