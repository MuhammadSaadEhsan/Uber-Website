const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.js');
const authUser = require('../middlewares/userAuthenticate.js');

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({min: 4}).withMessage('Password must be at least 4 characters long'),
        body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    ],
    userController.registerUser
)

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({min: 4}).withMessage('Password must be at least 4 characters long'),
    ],
    userController.loginUser
)

router.get('/profile',authUser.authenticateUser ,userController.getUserProfile);
router.get('/logout', authUser.authenticateUser, userController.logoutUser);

module.exports = router;