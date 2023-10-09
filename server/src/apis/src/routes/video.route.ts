import express from "express";
import passport from "passport";
import AuthController from "../controllers/aut.controller";
import authMiddleware from "../common/middlewares/authentication";
var jwt = require('jsonwebtoken');
const router= express.Router();
const AWS = require("aws-sdk");
const path= require("path");
const fs=require('fs');
require('dotenv').config({ path: path.join(__dirname, "../../../../.env") });
console.log(path.join(__dirname, "../../../../.env") );
import multer from "multer";

const storage = multer.memoryStorage(); // Stores files in memory (useful for small files)

// Create a multer instance with the storage engine
const upload = multer({ storage: storage });


router.post("/api/v1/upload-video",upload.single('video'),async (req : any,res : any)=>{

    try{
        const file: any=req.file;
        console.log(file);
        const file_data = file;
        const username= req.query.userName;
        const movieName = req.query.movieName;
        console.log(process.env.AWS_ACCESS_KEY_ID);
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        });

        const params = {
            Bucket: process.env.BUCKET,
            Key: `${username}/${movieName}`,
            Body: file_data.buffer,
        };
        let videoURL;
        const s3_upload_data: any = await new Promise((resolve) => {
            s3.upload(params, function (error: any, data: any) {
                resolve({ error, data });
            });
        });
        videoURL = s3_upload_data.data?.Key
        
        console.log(s3_upload_data);
        return res.status(200).json({videoURL})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

export {router as VideoRouter}
