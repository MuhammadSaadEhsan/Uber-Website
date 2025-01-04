const { cookie } = require("express-validator");
const userModel = require('../models/user')
const BlackListTokenModel = require('../models/blackListToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]|| req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const blackListedToken = await BlackListTokenModel.findOne({token});
    if(blackListedToken){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decode = jwt.decode(token)
        const user = await userModel.findById(decode);
        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.user = user;
        next();
    }
    catch(err){
        next(err);
    }
}