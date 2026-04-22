import mongoose from "mongoose";

const connectDb= async ()=>{
  try {
    const mongo_uri=process.env.MONGO_URI;
    await mongoose.connect(mongo_uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;