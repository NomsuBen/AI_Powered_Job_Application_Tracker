const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"],
      required: true,
    },
    applied_date: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
