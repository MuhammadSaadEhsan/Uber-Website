const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters long"],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,"Email must be at least 6 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[4,"Password must be at least 4 characters long"],
    },
    socketId:{
        type:String,
    },
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function(password){
    const user = this;
    return await bcrypt.compare(password,user.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('user',userSchema);
module.exports = userModel;