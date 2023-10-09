import express from "express";
import passport from "passport";
import authMiddleware from "../common/middlewares/authentication";
import SuperAdminController from "../controllers/superAdmin"
var jwt = require('jsonwebtoken');
const router= express.Router();



router.get("/api/change-distributor-status/:id",authMiddleware,async (req : express.Request,res : express.Response)=>{

    try{
        const status = await SuperAdminController.acceptDistributor(req,res)
        return res.status(200).json({
            'message': `${status}`
        })
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});


router.get("/api/v1/getDistributors",authMiddleware,async (req : express.Request,res : express.Response)=>{

    try{
        const status = await SuperAdminController.getAllUnAcceptedUsers(req,res)
        return res.status(200).json({
            'message': 'status updated sucessfully'
        })
    }catch(err :any){
        return res.status(500).json({
            error: err.message
        })
    }
});



export {router as SuperAdminRouter}
