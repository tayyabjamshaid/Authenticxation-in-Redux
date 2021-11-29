import jwt from 'jsonwebtoken';
const SECRET_KEY ="sjuddshhi"
import User from "./models/userSchema.js"
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
  
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};
export const isAuth = (req, res, next) => {
  const {authorization} = req.headers
  if(!authorization){
    return res.status(401).json({error:"you must be logged in"})
 }
 const token = authorization.replace("Bearer ","")
 jwt.verify(token,SECRET_KEY,(err,payload)=>{
     if(err){
      return   res.status(401).json({error:"you must be logged in"})
     }

     const {_id} = payload
     User.findById(_id).then(userdata=>{
         req.user = userdata
         next()
     })
     
     
 })
};