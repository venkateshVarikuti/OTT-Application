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
import movieController from "../controllers/movie.controller";
import User from "../../../database/models/user"

const storage = multer.memoryStorage(); // Stores files in memory (useful for small files)

// Create a multer instance with the storage engine
const upload = multer({ storage: storage });


router.post("/api/v1/upload-video",authMiddleware,upload.single('video'),async (req : any,res : any)=>{

    try{
        const file: any=req.file;
        console.log(file);
        const file_data = file;
        const username= req.user.username;
        const movieName = req.body.movieName;
        const user= await User.findOne({email : req.user.email});
        console.log(user)
        console.log(process.env.AWS_ACCESS_KEY_ID);
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        });

        const params = {
            Bucket: process.env.BUCKET  || '8g-videos',
            Key: `${username}/${movieName}.mp4`,
            Body: file_data.buffer,
            ContentType: ".mp4"
        };
        let videoURL;
        const s3_upload_data: any = await new Promise((resolve) => {
            s3.upload(params, function (error: any, data: any) {
                resolve({ error, data });
            });
        });
        videoURL = s3_upload_data.data?.Key
        req.body.key = videoURL
        req.body.user = user._id
        const movie= await movieController.uploadMovie(req,res);
        return res.status(200).json({movie})
        console.log(s3_upload_data);
        return res.status(200).json({videoURL})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.get("/api/v1/getAllUploadedMoviesByMe",authMiddleware,async (req : any,res : any)=>{
    try{
        const findUser= await User.findOne({email : req.user.email});
        if(findUser.role!='distributor'){
            throw new Error("distributor can only see their uploaded videos")
        }
        const user= await  movieController.getMoviesByDistributorByMe(req,res);
        return res.status(200).json({user})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.get("/api/v1/getAllUploadedMoviesByDistributor/:id",authMiddleware,async (req : express.Request,res : express.Response)=>{
    try{
        const user= await  movieController.getMoviesByDistributor(req,res);
        return res.status(200).json({user})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.post("/api/v1/getAllMovies",authMiddleware,async (req : express.Request,res : express.Response)=>{
    try{
        const user= await  movieController.getAllMovies(req,res);
        return res.status(200).json({user})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.get("/api/v1/change-movie-status/:id",authMiddleware,async (req : express.Request,res : express.Response)=>{

    try{
        const status = await movieController.acceptMovie(req,res)
        return res.status(200).json({
            'message': `${status}`
        })
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.get("/api/change-movie-status/:id",authMiddleware,async (req : express.Request,res : express.Response)=>{

    try{
        const status = await movieController.acceptMovie(req,res)
        return res.status(200).json({
            'message': `${status}`
        })
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});


export {router as VideoRouter}
