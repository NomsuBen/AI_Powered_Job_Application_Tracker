const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ Ensures applications are linked to a user
      index: true, // ✅ Improves query performance
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
      index: true, // ✅ Speeds up searches by company
    },
    applicationStatus: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"],
      required: true, // ✅ Ensures status is always set
      default: "Applied", // ✅ Default status
    },
    notes: {
      type: String,
      trim: true,
    },
    dateApplied: {
      type: Date,
      required: true, // ✅ Ensures date is provided
      default: () => new Date(), // ✅ More reliable default date
    },
  },
  { timestamps: true } // ✅ Adds `createdAt` & `updatedAt` automatically
);

// ✅ Compound index for optimized queries
JobApplicationSchema.index({ userId: 1, companyName: 1 });

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
