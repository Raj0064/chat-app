import {User} from "../models/User.js"

export const isAuthenticated=async(req,res,next)=>{
  try {
    const token=req.cookies.token;
    if(!token)
    {
      return res.status(401).json({
        message: "User not Authenticated",
        success: false,
      });
    }

    const decode=jwt.verify(token,"secret_key");
  
    if(!decode)
    {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    else{
      const user=await User.findById(decode.userId).select("-password");
      req.user=user;
      next();
    }

  } catch (error) {
    console.log(error);
      return res.status(500).json({ message: "Authentication error" });
  }

}