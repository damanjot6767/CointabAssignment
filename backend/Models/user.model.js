const mongoose = require("mongoose");
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    name:{type:Number,required:true},
    email:{type:Number,required:true,unique:true,validate:{validator:validator.isEmail,message:props=`${props.value} is not a valid email address!`}},
    password:{type:Number,required:true}
})

const UserModel =  mongoose.model("user",UserSchema);
module.exports=UserModel;
