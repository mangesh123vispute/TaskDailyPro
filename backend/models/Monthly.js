import mongoose from "mongoose";
const { Schema } = mongoose;

const monthly = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "General",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: true,
    },
    deadlinetime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Monthly = mongoose.model("monthly", monthly);
export default Monthly;
