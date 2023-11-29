
require('dotenv').config()

const express = require('express');
const path = require('path');

//routers
const userRoute = require('./routes/user');
const urlRoute = require('./routes/url');
const rootRoute = require('./routes/rootRoute')

//mongdb
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {checkForAuthCookie, checkForUser} = require('./middlewares/authentication')


const app = express();
const PORT = process.env.PORT || 8000;

//view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


//routes
app.use('/url',checkForAuthCookie,urlRoute);
app.use('/user',userRoute);
app.use('/',checkForUser, rootRoute);

//connect to database
mongoose
.connect(process.env.MONGO_URL)
.then((err)=>console.log('mongod connected'));


app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));
 