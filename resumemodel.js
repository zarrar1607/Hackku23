const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: String,
});

// Create a Mongoose model for the "resume" data using the schema
const Resume = mongoose.model("Resume", ResumeSchema, "Resume");
