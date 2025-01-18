const {
    createNewUser,
    loginForUser
} = require('../Models/auth.model');
const {
    validationResult
} = require('express-validator');

const ADMIN_USER_IDS = require('../Config/isAdmin');

exports.getSignup = (req, res, next) => {
    return res.status(200).json({
        messages: {
            error: req.flash('error'),
            success: req.flash('success')
        },
        isAdmin: false
    });
};

exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }

    try {
        const newUser = await createNewUser(username, email, password);
        return res.status(201).json({ message: 'Signup successful!', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getLogin = (req, res, next) => {
    return res.status(200).json({
        messages: {
            success: req.flash('success'),
            error: req.flash('error'),
        },
        isAdmin: false
    });
};

exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const isValidUser = await loginForUser(username, password);

        if (isValidUser) {
            const isAdminUser = ADMIN_USER_IDS.includes(isValidUser._id.toString());
            req.session.user = {
                id: isValidUser._id,
                username: isValidUser.username,
                isAdmin: isAdminUser
            };

            return res.status(200).json({ message: 'Logged in successfully!', user: req.session.user });
        } else {
            return res.status(401).json({ error: 'Username or password is invalid, please try again' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};
