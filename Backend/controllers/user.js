const userModel = require('../models/user');
const userService = require('../services/user');
const {validationResult, cookie} = require('express-validator');
const BlackListTokenModel = require('../models/blackListToken');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password, fullname} = req.body;
    const {firstname, lastname} = fullname;
    try{
        const hashPassword = await userModel.hashPassword(password);
        const user = await userService.createUser(firstname,lastname,email,hashPassword);
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    }
    catch(err){
        next(err);
    }
}
module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        const isValid = await user.comparePassword(password);
        if(!isValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = await user.generateAuthToken();
        res.cookie('token',token)
        res.status(200).json({user, token});
    }
    catch(err){
        next(err);
}
}
module.exports.getUserProfile = async (req, res,next) => {
    try{
        // const user = await userModel.findById(req.user._id);
        const user = req.user;
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

module.exports.logoutUser = async (req, res,next) => {
    try{
        const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
        const blackListedToken = await BlackListTokenModel.create({token});
        res.clearCookie('token');
        res.status(200).json({message: 'Logged out successfully'});
    }
    catch(err){
        next(err);
    }
}
