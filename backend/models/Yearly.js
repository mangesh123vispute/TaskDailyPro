const mongoose = require("mongoose");
const { Schema } = mongoose;

const Yearly = new Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Yearly", Yearly);
