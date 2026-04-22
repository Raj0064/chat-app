import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Sign Up
export const register = async(req,res)=>{
try {
  const { name, email, password } = req.body;

  const existedUser=await User.findOne({email});
  console.log(existedUser);
  if(existedUser){
    return res.status(500).json({
      message: "User already exist with this email id"
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedpassword,
  });
  res.status(200).json(user);

} catch (error) {
  console.log(error);
  return res.status(500).json({message:"Registration Error"})
}

};

export const Login = async(req,res)=>{
  try {
    const {email,password}=req.body;

    console.log(email,password);
    let user=await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

     const isPasswordMatched = await bcrypt.compare(password, user.password);
     if (!isPasswordMatched) {
       return res.status(400).json({
         message: "Incorrect email or password",
         success: false,
       });
     }

     const tokenData={ userId:user._id};
     const secret_key=process.env.secret_key;
     const token=await jwt.sign(tokenData,secret_key,{
      expiresIn:"1d"
     })

     return res
       .status(200)
       .cookie("token", token, {
         maxAge: 1 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: "strict",
       })
       .json({user,success:true});

  } catch (error) {
    console.log(error);
      return res.status(500).json({ message: "Login error" });
  }
}

//Log Out
export const LogOut = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
      .json({
        message: "Logged Out Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};



// controllers/authController.js
export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};