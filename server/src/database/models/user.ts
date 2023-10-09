const crypto = require('crypto');
const mongoose = require('mongoose');
import validator from "validator";
const bcrypt = require('bcryptjs');
const { INTEGER } = require('sequelize');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  DOB:{
    type: String,
    required:[true, 'Please provide year of completion']
  },
  
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  gender:{
    type: String,
    default: 'male',
  },
  role:{
    type:String,
    default:'user'
  },
  phoneNumber:{
    type:Number,
    minlenght:10,
    
    required:[true,'Give a valid mobile number']
  },
  isAccepted:{
    type: Boolean,
    default: false
  }
  ,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  isRejected :{
    type: Boolean,
    default: false
  }
});

// userSchema.pre('save', async function(this : any ,next : any ) {
//   // Only run this function if password was actually modified
//   if (!this.isModified('password')) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.pre('save', function(this : any,next: any) {
//   if (!this.isModified('password') || this.isNew) return next();

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// userSchema.pre(/^find/, function(this : any,next : any) {
//   // this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

// userSchema.methods.correctPassword = async function(
//   candidatePassword : any,
//   userPassword: any
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp: any) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000 as any,
//       10
//     );

//     return JWTTimestamp < changedTimestamp;
//   }

//   // False means NOT changed
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function(this : any) {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   console.log({ resetToken }, this.passwordResetToken);

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model('User', userSchema);
export default User;