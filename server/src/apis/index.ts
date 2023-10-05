import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { AuthRouter } from "./src/routes/aut.route";
import { db } from '../database/connection';
const path = require("path");
const cors= require('cors');
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const init = async () => {
    const app= express();
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());

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


db.connect()
  .then(() => {
    console.log("db connected");
    init();
  })
  .catch((err: Object) => {
    console.log("Error connecting database: ", err);
  });
