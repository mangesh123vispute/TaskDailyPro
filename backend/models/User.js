const mongoose = require("mongoose");
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
    dailyTasks: {
      totalTask: {
        type: Number,
        default: 0,
      },
      completedTask: {
        type: Number,
        default: 0,
      },
      inpercentage: {
        type: Number,
        default: 0,
      },
    },
    monthlyTasks: {
      totalTask: {
        type: Number,
        default: 0,
      },
      completedTask: {
        type: Number,
        default: 0,
      },
      inpercentage: {
        type: Number,
        default: 0,
      },
    },
    yearlyTasks: {
      totalTask: {
        type: Number,
        default: 0,
      },
      completedTask: {
        type: Number,
        default: 0,
      },
      inpercentage: {
        type: Number,
        default: 0,
      },
    },
    goals: {
      totalTask: {
        type: Number,
        default: 0,
      },
      completedTask: {
        type: Number,
        default: 0,
      },
      inpercentage: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
