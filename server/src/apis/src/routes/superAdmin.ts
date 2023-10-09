import express from "express";
import passport from "passport";
import SuperAdminController from "../controllers/superAdmin"
var jwt = require('jsonwebtoken');
const router= express.Router();



router.post("/api/v1/accept-distributor",async (req : express.Request,res : express.Response)=>{

    try{
        return SuperAdminController.acceptDistributor(req,res);
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});



export {router as SuperAdminRouter}
