import mongoose from "mongoose";
const { Schema } = mongoose;

const LogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    dailyTasks: [
      {
        Day: {
          type: String,
        },
        tasks: [
          {
            task: {
              type: Schema.Types.ObjectId,
              ref: "DailyTask",
            },
            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
        efficiency: {
          type: Number,
          default: 0,
        },
      },
    ],
    monthlyTasks: [
      {
        Month: {
          type: String,
        },
        tasks: [
          {
            task: {
              type: Schema.Types.ObjectId,
              ref: "DailyTask",
            },
            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
        efficiency: {
          type: Number,
          default: 0,
        },
      },
    ],
    yearlyTasks: [
      {
        Year: {
          type: String,
        },
        tasks: [
          {
            task: {
              type: Schema.Types.ObjectId,
              ref: "DailyTask",
            },
            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
        efficiency: {
          type: Number,
          default: 0,
        },
      },
    ],
    goals: [
      {
        Name: {
          type: String,
        },
        Goal: {
          type: Schema.Types.ObjectId,
          ref: "Goal",
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const Log = mongoose.model("Log", LogSchema);
export default Log;
