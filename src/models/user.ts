import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: false
    },
    passwordReset: {
      type: Boolean,
      required: false
    },
    userType: {
      // Admin
      // Medical Facility Head
      // Department Head
      // Doctor
      // Secretary
      // Patient
      type: String,
      required: true
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model("users", userSchema)

export default UserModel
