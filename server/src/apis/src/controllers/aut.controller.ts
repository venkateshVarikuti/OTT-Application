
import { generateSecret, generateOTPCode } from "../common/otp";
import nodemailer from "nodemailer";

const { compareSync, hashSync  } = require('bcrypt');
const jwt = require('jsonwebtoken');



class AuthController{

    async register(req: any, res:any){
        const encrypted_password= hashSync(req.body.password,10);
        const user ={
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email : req.body.email,
            password : encrypted_password,
            phoneNumber: req.body.phoneNumber,
            DOB: req.body.DOB,
            gender: req.body.gender,
        }
    }

    async login(req:any , res:any){
        const user:any= {
        };
        user.findOne({email : req.body.email}).then((user: any)=>{
    
            if(!user){
                return res.status(401).json({
                    msg: "Email not found"
                });
            }
            if(compareSync(req.body.password, user.password)==false){
                return res.status(401).json({
                    msg: "Password Incorrect"
                });
            }
            const payload={
                email : user.email
            };
            var token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            return res.status(200).json({
                token : "Bearer " + token
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


}

export default new AuthController();

