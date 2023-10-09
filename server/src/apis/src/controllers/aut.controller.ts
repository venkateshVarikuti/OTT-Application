
import { generateSecret, generateOTPCode } from "../common/otp";
import nodemailer from "nodemailer";
import User from "../../../database/models/user"
import speakeasy from "speakeasy";
const { compareSync, hashSync  } = require('bcrypt');
const jwt = require('jsonwebtoken');



class AuthController{

    async register(req: any, res:any){
        const encrypted_password= hashSync(req.body.password,10);
        const user=User.create(
            {
                username : req.body.username,
                email : req.body.email,
                password : encrypted_password,
                phoneNumber: req.body.phoneNumber,
                DOB: req.body.DOB,
                gender: req.body.gender,
                role: req.body.role,
                isAccepted: req.body.role =='user' || req.body.role =='superAdmin' ? true: false
            }
        );
        return user;
    }

    async login(req:any , res:any){
        
        User.findOne({email : req.body.email}).then((user: any)=>{
    
            if(!user){
                return res.status(401).json({
                    msg: "Email not found"
                });
            }
            if(user.role=='distributor' && user.isAccepted==false){
                return res.status(401).json({
                    msg: "distributor is not accepted"
                });
            }
            if(compareSync(req.body.password, user.password)==false){
                return res.status(401).json({
                    msg: "Password Incorrect"
                });
            }
            
            const payload={
                username: user.username,
                email : user.email
            };
            var token = jwt.sign(payload, 'weljmwieuilsdcpoavqwebcskdiutregbc'
                ,{expiresIn: "3d"});
            return res.status(200).json({
                token :  token
            });
        });
    }

    async sendOTP(req: any, res: any){

        const secret = generateSecret();
        const OTP = generateOTPCode(secret);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'forevercp110@gmail.com',
              pass: 'djxa fjak svyi ouyp',
            },
          });
          
          // Compose the email
          const mailOptions = {
            from: 'forevercp110@gmail.com',
            to: 'praveen.vemavarapu@gytworkz.com',
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: ${OTP} </p>`, // Include the OTP here
          };

                // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            return res.status(500).json({
                error: error.message
            });
            } else {
                return res.status(200).json({
                    info
                })
            }
        });
    }

    async verifyOTP(req: any,res: any){

        try{
            const { secret, otp, email } = req.body;
        // Verify the OTP code with (secret + token + step + encoding)
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: otp,
            step: 600 // OTP is valid for 600 seconds
        });

        if (verified) {
            // Update the emailVerified field
            return res.status(200).json({ message: 'OTP is valid' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to verify OTP' });
        }
    }
}
export default new AuthController();

