
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
require('dotenv').config();
const port = process.env.PORT || '8000';

const UserRouter = require('./routes/users');
const connect = require("./database/connect.database")
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', UserRouter);//user route for registration and login

app.listen(port,async()=>{
  await connect()
  console.log(`server started on ${port}`)
})
