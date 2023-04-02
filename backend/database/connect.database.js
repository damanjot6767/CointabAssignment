const mongoose = require('mongoose');
require('dotenv').config();
const url =`${ process.env.MONGOURL}`;
const connect =async()=>{
   return await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("mongodb is connected")).catch((err)=>console.log(err))
}

module.exports = connect