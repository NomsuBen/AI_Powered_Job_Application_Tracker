const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobApplication = require('../models/JobApplication');

// route get /api/applications
// desc get all job applications for the logged in user
router.get('/', auth, async (req, res) => {
    try {
        const applications = await JobApplication.find({ userId: req.user.id });
        res.json(applications);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// route post /api/applications
// desc Create a new job application
router.post('/', auth, async (req, res) => {
    const { companyName, jobTitle, jobLocation, applicationDate, applicationStatus, notes } = req.body;
    try {
        const newApplication = new JobApplication({
            userId: req.user.id,
            companyName,
            jobTitle,
            jobLocation,
            applicationDate,
            applicationStatus,
            notes
        });
        const application = await newApplication.save();
        res.json(application);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

// route put /api/applications/:id
// desc Update an existing job application
router.put('/:id', auth, async (req, res) => {
    const { companyName, jobTitle, jobLocation, applicationDate, applicationStatus, notes} = req.body;
    try {
        let application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }
        if (application.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        application.jobTitle = jobTitle || application.jobTitle;
        application.companyName = companyName || application.companyName;
        application.jobLocation = jobLocation || application.jobLocation;
        application.applicationDate = applicationDate || application.applicationDate;
        application.applicationStatus = applicationStatus || application.applicationStatus;
        application.notes = notes || application.notes;

        application = await application.save();
        res.json(application);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

// route delete /api/applications/:id
// desc Delete an existing job application
router.delete('/:id', auth, async (req, res) => {
    try {
        let application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }
        if (application.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await JobApplication.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Application removed' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

module.exports = router;