import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    },
    phone: {
      type: Number,
      default: 0,
    },
    whatsappNumber: {
      type: Number,
      default: 0,
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
export default User;
