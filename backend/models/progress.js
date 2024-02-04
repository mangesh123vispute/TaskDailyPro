import mongoose from "mongoose";
const { Schema } = mongoose;

const progress = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
  { timestamps: true }
);

const Progress = mongoose.model("progress", progress);
export default Progress;
