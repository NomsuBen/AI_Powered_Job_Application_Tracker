const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


//@route POST /api/register
//@desc Register a user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await user.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        else {
    }

    user = new User({
        email,
        password
    });

    //Hash the password
    const salt = await bcrypt.genSalt(10);  //10 is the number of rounds
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
}
});

// @route POST /api/login
// @desc Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);

module.exports = router;