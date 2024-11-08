// models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Please provide a password'],
   },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
