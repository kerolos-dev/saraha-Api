import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    forgetCode: {
      type:String,
      default: true,
    },
    profillePic:String,

  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", schema);
