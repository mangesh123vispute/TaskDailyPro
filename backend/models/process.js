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
        startdate: {
          type: Date,
          required: [true, "task start date is required"],
        },
        enddate: { type: Date, required: [true, "task end date is required"] },
        iscompleted: { type: Boolean, default: false },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Process = mongoose.model("Process", process);
module.exports = Process;
