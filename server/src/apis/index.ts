const express = require("express");
const passport = require("passport");
const  dotenv = require("dotenv") ;
import { AuthRouter } from "./src/routes/aut.route";
import mongoose, { ConnectOptions } from "mongoose";
const session = require("express-session")
import { VideoRouter } from "./src/routes/video.route";
import {  SuperAdminRouter } from "./src/routes/superAdmin";

const path = require("path");
const cors= require('cors');
dotenv.config({ path: path.join(__dirname, "../../../.env") });
const sessionMiddleware = session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false
});

require('./src/common/config/passport')

const init = async () => {
    const app= express();
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        AuthRouter,
        VideoRouter,
        SuperAdminRouter
    )
    app.use(sessionMiddleware);

    app.get("/", (req : any,res:any )=>{
        res.status(200).json({
            msg: "Recieved get"
        });
    });

    app.listen(process.env.PORT|| 4000, async ()=>{
        console.log("Server is running on ",process.env.PORT|| 4000);
    })
        
  
  };


const DB:any =`mongodb+srv://prakash110cse:FvzFEkCHFZNaHLmL@8gott.x6tims4.mongodb.net/?retryWrites=true&w=majority`
console.log(DB)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
   // useFindAndModify: false
  } as ConnectOptions)
  .then(() =>{
    init();
    console.log('DB connection successful!');
  } );
