const mongoose = require("mongoose");
const { Schema } = mongoose;

const processSchema = new Schema(
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
          type: String,
          default: formatDateNow(),
        },
        enddate: {
          type: String,
          default: formatDateNow(),
        },
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

//* Helper function to format current date in "dd-mm-yy" format
function formatDateNow() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
}

// *Pre-save middleware to update startdate and enddate before saving
processSchema.pre("save", function (next) {
  this.tasks.forEach((task) => {
    if (!task.startdate) {
      task.startdate = formatDateNow();
    }
    if (!task.enddate) {
      task.enddate = formatDateNow();
    }
  });
  next();
});

const Process = mongoose.model("Process", processSchema);
module.exports = Process;
