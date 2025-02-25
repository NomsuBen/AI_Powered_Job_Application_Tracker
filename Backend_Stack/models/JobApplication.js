const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: string,
        enum: ['Applied', 'Interview Scheduled', 'Interview Completed', 'Rejected', 'Offered', 'Accepted'],
        default: 'Applied'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('jobApplication', jobApplicationSchema);