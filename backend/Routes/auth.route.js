const router = require('express').Router();
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const authController = require('../Controllers/auth.controller');

const authGuard = require('./guards/auth.guard')
const bodyParserMW = bodyParser.json();

router.get("/signup", authController.getSignup);

router.post(
    "/signup",
    bodyParserMW,
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        }
        return true;
    }),
    authController.postSignup
);

router.get("/login", authGuard.preventAccessLogin ,authController.getLogin);
router.post("/login", bodyParserMW, authController.postLogin);

router.all('/logout', authController.logout);

module.exports = router;
