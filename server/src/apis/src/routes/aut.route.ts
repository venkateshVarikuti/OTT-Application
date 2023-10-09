import express from "express";
import passport from "passport";
import AuthController from "../controllers/aut.controller";
import authMiddleware from "../common/middlewares/authentication";
var jwt = require('jsonwebtoken');
const router= express.Router();



router.post("/api/v1/register",async (req : express.Request,res : express.Response)=>{

    try{
        const user= await AuthController.register(req,res);
        return res.status(200).json({user})
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.post("/api/v1/login",async (req : any, res : any)=>{

    try{
        return AuthController.login(req,res);
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});

router.get("/api/v1/sendOTP",async (req:any , res: any)=>{

    try{
        return AuthController.sendOTP(req,res);
    }catch(err :any){
        res.status(500).json({
            error: err.message
        })
    }
});

export {router as AuthRouter}
