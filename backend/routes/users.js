var express = require('express');
var UserRouter = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../Models/user.model');


const failedAttemps = {};

const RateLimit = (req, res, next) => {
  const email = req.body.email;
  const attempts = failedAttemps[email];
  
  if (attempts && attempts.count >= 5) {
    let diffTime = 86400000 - (Date.now() - attempts.lastAttempt);
    diffTime=diffTime/1000;
    if(diffTime<=0){//if difference is less that or equal tp zero then de;lete user from object and reset attempt to login 5 times
      delete failedAttemps[email];
      return next()
    }
    res.status(403).send({status:"failure",msg:`Too many login attempts. Please try again in ${Math.floor(diffTime /3600)} hours ${Math.floor((diffTime%3600)/60)} minutes.`});
    return;
  }
  
  next();
};

//User Registration
UserRouter.post('/register' ,async(req, res)=> {
  const{email,name,password}=req.body;

  try {
    if(!email || !name || !password){
      return res.status(400).send({status:"failure",msg:"please enter all the details!"})
    }
    // Hash the password using bcrypt
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);

   let user= await UserModel({email,name,password:hashPassword});//save user infromation to the database
   await user.save();

   return res.status(201).send({status:"success",msg:"user registered successfully!"})
  } catch (error) {
    return res.status(400).send({status:"failure",msg:error.message})
  }
});

//user Login
UserRouter.post('/login',RateLimit, async(req, res)=> {
  const{email,password}=req.body;
  try {
    if(!email  || !password){
      return res.status(400).send({status:"failure",msg:"please enter all the details!"})
    }
    // verify the password using bcrypt
     const userExist = await UserModel.findOne({email});
     if(!userExist){
      return res.status(400).send({status:"failure",msg:"User Not Exist!"})
     }

     const verifyPassword = await bcrypt.compare(password, userExist.password);
     if(!verifyPassword){
       // Increment failed login attempts
    if (!failedAttemps[email]) {
      failedAttemps[email] = { count: 1, lastAttempt: Date.now() };
    } 
     else {
      failedAttemps[email].count++;
      failedAttemps[email].lastAttempt = Date.now();
    }
      return res.status(400).send({status:"failure",msg:`Incorrect Email or password! your ${5-failedAttemps[email].count} Attempt is left.`})
     }
     failedAttemps[email] = { count: 0, lastAttempt: null };
    return res.status(201).send({status:"success",msg:"user login successfully!"})
  } catch (error) {
    return res.status(400).send({status:"failure",msg:error.message})
  }
});

//user profile
UserRouter.get('/profile/:id' ,async(req, res)=> {
  const{id}=req.params;

  try {
    if(!id){
      return res.status(400).send({status:"failure",msg:"please provide user id!"})
    }
    // Hash the password using bcrypt

   let user= await UserModel.findOne({_id:id});//find user details
   if(!user){
    return res.status(400).send({status:"failure",msg:"User Not Exist"})//if user not exist
   }
   return res.status(201).send({status:"success",msg:{name:user.name,email:user.email}})//send user name and mail
  } catch (error) {
    return res.status(400).send({status:"failure",msg:error.message})
  }
});
//after 24 hours delete the email of particular user so that object not become too large
 
module.exports = UserRouter;
