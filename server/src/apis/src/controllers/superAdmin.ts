
import { generateSecret, generateOTPCode } from "../common/otp";
import nodemailer from "nodemailer";
import User from "../../../database/models/user"
import speakeasy from "speakeasy";
const { compareSync, hashSync  } = require('bcrypt');
const jwt = require('jsonwebtoken');



class SuperAdminController{

    async acceptDistributor(req: any, res:any){
        try{
            const user = await User.findOne({email : req.user.email});
            console.log(user)
            if(user.role!='superAdmin'){
                throw new Error("only superAdmin can change the Status")
            }
            if(req.params.isAccepted==="true"){
                const distributor= User.updateOne(
                    {
                        id : req.params.id
                    },{
                        isAccepted : true
                    }
                )
                return 'Successfully You have Accepted the Distributor'
            }
            if(req.paras.isRejected==="true"){
                const distributor= User.updateOne(
                    {
                        id : req.params.id
                    },{
                        isRejected : true
                    }
                )
                return 'You have Rejected the Distributor'

            }
            
       
        }catch(err: any){
            throw Error(err.message)

        }
        
    }

    async getAllUnAcceptedUsers(req: any, res:any){
        try{
            const user = await User.findOne({email : req.user.email});
            if(user.role!='superAdmin'){
                throw new Error("only superAdmin can change the Status")
            }
            if(req.params.accepted=="true" && req.params.rejected){
                const distributors= User.find(
                    {
                    }
                )
            return distributors

            }else if(req.params.accepted=="true"){
                const distributors= User.find(
                    {
                        isAccepted: true
                    }
                )
            return distributors

            }else{
                const distributors= User.find(
                    {
                        isRejected: true
                    }
                )
            return distributors

            }

            
        }catch(err: any){
            throw Error(err.message)

        }
        
    }

}
export default new SuperAdminController();

