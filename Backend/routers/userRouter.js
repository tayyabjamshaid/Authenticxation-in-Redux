import express from "express"
import expressAsyncHandler from "express-async-handler"
import User from "../models/userSchema.js"

import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
const SECRET_KEY ="sjuddshhi"
const userRouter=express.Router()


userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
           
            email: user.email,
            isAdmin: user.isAdmin,
           
            token: JWT.sign({_id:user._id,email:user.email,
                isAdmin:user.isAdmin},process.env.JWT_SECRET || SECRET_KEY,{expiresIn:'30d'}),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );
  userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
     
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
     
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: JWT.sign({_id:user._id,email:user.email,
            isAdmin:user.isAdmin},SECRET_KEY,{expiresIn:'30d'}),
      });
     
    })
  );
  

export default userRouter