
import { generateSecret, generateOTPCode } from "../common/otp";
import nodemailer from "nodemailer";
import User from "../../../database/models/user"
import speakeasy from "speakeasy";
const { compareSync, hashSync  } = require('bcrypt');
const jwt = require('jsonwebtoken');



class SuperAdminController{

    async acceptDistributor(req: any, res:any){
        const distributor= User.updateOne(
            
        )
    }

}
export default new SuperAdminController();

