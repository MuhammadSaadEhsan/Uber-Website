const userModel = require('../models/user');
const userService = require('../services/user');
const {validationResult} = require('express-validator');

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