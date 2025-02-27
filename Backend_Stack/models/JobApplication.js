const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: { type: String, required: true }, // ✅ Match frontend field name
    companyName: { type: String, required: true }, // ✅ Match frontend field name
    applicationStatus: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"],
      required: true,
    },
    applicationDate: { type: Date, required: true }, // ✅ Match frontend field name
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
