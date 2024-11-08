// routes/authRoute.js
import express from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
   const { email, password } = req.body;

   try {
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ message: 'Email is already registered' });
      }

      const user = await User.create({
         email,
         password,  
      });

      return res.status(201).json({
         _id: user._id,
         email: user.email,
         token: generateToken(user._id),
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
         return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.status(200).json({
         _id: user._id,
         email: user.email,
         token: generateToken(user._id),
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

export default router;
