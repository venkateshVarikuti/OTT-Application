const express = require("express");
const passport = require("passport");
const  dotenv = require("dotenv") ;
import { AuthRouter } from "./src/routes/aut.route";
import mongoose, { ConnectOptions } from "mongoose";

const path = require("path");
const cors= require('cors');
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const init = async () => {
    const app= express();
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        AuthRouter
    )

    app.get("/", (req : any,res:any )=>{
        res.status(200).json({
            msg: "Recieved get"
        });
    });

    app.listen(process.env.PORT, async ()=>{
        console.log("Server is running on ",process.env.PORT);
    })
        
  
  };


const DB:any =process.env.DATABASE?.replace(
  '<password>', process.env.DATABASE_PASSWORD as any
);
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
