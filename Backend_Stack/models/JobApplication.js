const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String },
    applicationStatus: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"],
      required: true,
    },
    applicationDate: { type: Date, default: Date.now }, // ✅ Default value added
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
