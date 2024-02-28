import mongoose from "mongoose";
const { Schema } = mongoose;

const DailyTaskLogs = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    Details: [
      {
        Day: {
          type: Date,
          default: Date.now,
        },
        Tasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DailyTask",
          },
        ],
        completedTasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DailyTask",
          },
        ],
        EfficiencyOfTheDay: {
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

const DailyLogs = mongoose.model("DailyTaskLog", DailyTaskLogs);
export default DailyLogs;
