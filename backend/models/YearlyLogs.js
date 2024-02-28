import mongoose from "mongoose";
const { Schema } = mongoose;

const YearlyTaskLogs = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    Details: [
      {
        Year: {
          type: String,
        },
        Tasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "YearlyTasks",
          },
        ],
        completedTasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "YearlyTasks",
          },
        ],
        EfficiencyOfTheYear: {
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

const YearlyLogs = mongoose.model("YearlyTaskLog", YearlyTaskLogs);
export default YearlyLogs;
