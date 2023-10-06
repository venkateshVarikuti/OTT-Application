import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { AuthRouter } from "./src/routes/aut.route";
const path = require("path");
const cors= require('cors');
dotenv.config({ path: path.join(__dirname, "../../../.env") });

console.log("weelf");

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
