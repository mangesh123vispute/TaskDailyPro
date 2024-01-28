// * least of mentors
const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentors = new Schema(
  {
    GoalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
    mentors: [
      {
        name: {
          type: String,
          required: [true, "name is required"],
        },
        achivements: {
          type: String,
          required: [true, "achivements are required"],
        },
        suggestions: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mentors = mongoose.model("Mentor", mentors);

module.exports = Mentors;
