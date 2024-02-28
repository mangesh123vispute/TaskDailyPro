import mongoose from "mongoose";
const { Schema } = mongoose;

const MonthlyTaskLogs = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    Details: [
      {
        Month: {
          type: String,
        },
        Tasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "monthly",
          },
        ],
        completedTasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "monthly",
          },
        ],
        EfficiencyOfTheMonth: {
          type: Number,
          default: 0,
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

const MonthLogs = mongoose.model("MonthlyLog", MonthlyTaskLogs);
export default MonthLogs;
