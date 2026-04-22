import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
export const User=mongoose.model("User",UserSchema);