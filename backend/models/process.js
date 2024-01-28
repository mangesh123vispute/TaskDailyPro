const mongoose = require("mongoose");
const { Schema } = mongoose;

const process = new Schema(
  {
    GoalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
    tasks: [
      {
        id: { type: Number, required: [true, "task id is required"] },
        name: { type: String, required: [true, "task name  is required"] },
        description: {
          type: String,
          required: [true, "task description is required"],
        },
        startdate: {
          type: Date,
          default: Date.now(),
        },
        enddate: { type: Date, default: Date.now() },
        iscompleted: { type: Boolean, default: false },
      },
    ],
    details: {
      reviewedBy: {
        type: Number,
        default: 0,
      },
      verifiedBy: {
        type: Number,
        default: 0,
      },
      accuracy: {
        type: Number,
        default: 0,
      },
    },
  },

  {
    timestamps: true,
  }
);

const Process = mongoose.model("Process", process);
module.exports = Process;
