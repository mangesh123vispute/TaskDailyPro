import mongoose from "mongoose";
const { Schema } = mongoose;

const Goals = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
    Goal: {
      type: String,
      required: [true, "Goal is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    deadline: {
      type: Date,
      required: [true, "deadline is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tag: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", Goals);
export default Goal;
