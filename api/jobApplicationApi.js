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

// Firm Email Template
const firmTemplate = (data) => {
  return `
    <h2>📩 New Job Application Received</h2>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Job Title:</strong> ${data.jobTitle}</p>
    <p><strong>Experience:</strong> ${data.experience}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Employment Status:</strong> ${data.employmentStatus}</p>
    <p><strong>Expected Salary:</strong> ${data.salary}</p>
    <p><strong>Notes:</strong> ${data.notes || "N/A"}</p>
  `;
};

// User Email Template
const userTemplate = (data) => {
  return `
    <h2>✅ Thank You for Applying</h2>
    <p>Dear ${data.fullName},</p>
    <p>Thank you for applying to <strong>Cosmic HR Solutions</strong> for the role of <strong>${data.jobTitle}</strong>.</p>
    <p>Our HR team will review your application and get back to you soon.</p>
    <p>Regards,<br>Cosmic HR Solutions Team</p>
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

    const {
      fullName,
      email,
      phone,
      jobTitle,
      experience,
      location,
      employmentStatus,
      salary,
      notes,
    } = fields;

    const { error } = jobValidationSchema.validate({
      fullName,
      email,
      phone,
      jobTitle,
      experience,
      location,
      employmentStatus,
      salary,
      notes,
    });

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
    const newJob = new JobModel({
      fullName,
      email,
      phone,
      jobTitle,
      experience,
      location,
      employmentStatus,
      salary,
      notes,
      resume: resumePath,
    });

    await newJob.save();

    // Send Emails
    await Promise.all([
      transporter.sendMail({
        from: SMTP_MAIL,
        to: SMTP_MAIL,
        subject: `New Job Application: ${jobTitle}`,
        html: firmTemplate(newJob),
      }),
      transporter.sendMail({
        from: SMTP_MAIL,
        to: email,
        subject: "Thank You for Applying - Cosmic HR Solutions",
        html: userTemplate(newJob),
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
