import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
  
   const keyword = {
     $or: [
       { username: { $regex: req.query.search, $options: "i" } },
       { name: { $regex: req.query.search, $options: "i" } }
      //  { email: { $regex: req.query.search, $options: "i" } },
     ],
   };

    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } }) // exclude yourself
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
    });
  }
};
