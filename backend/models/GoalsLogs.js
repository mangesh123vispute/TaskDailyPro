import mongoose from "mongoose";
const { Schema } = mongoose;

const goalsLogs = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    Details: [
      {
        Goal: {
          type: String,
        },
        completedOrNot: {
          type: Boolean,
          default: false,
        },
        Deadline: {
          type: Date,
        },
      },
    ],
    TotalEfficiency: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const GoalsLogs = mongoose.model("GoalsLog", goalsLogs);
export default GoalsLogs;
