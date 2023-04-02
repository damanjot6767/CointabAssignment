const mongoose = require("mongoose");
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,validate:[validator.isEmail,'Please Provide a valid email!']},
    password:{type:String,required:true}
})

const UserModel =  mongoose.model("user",UserSchema);
module.exports=UserModel;
