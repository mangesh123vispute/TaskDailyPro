const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompletedTask = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Completed = mongoose.model("completedTask", CompletedTask);

module.exports = Completed;
