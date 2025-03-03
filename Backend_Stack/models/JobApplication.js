const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ Ensures applications are linked to a user
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    applicationStatus: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"],
      default: "Applied", // ✅ Default status
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // ✅ Adds `createdAt` & `updatedAt` automatically
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
