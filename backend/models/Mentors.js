// * least of mentors
const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentors = new Schema(
  {
    GoalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
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
        contacts: {
          whatsapp: {
            type: Number,
          },
          mobNumber: {
            type: Number,
          },
          insta: {
            type: String,
          },
          linkedin: {
            type: String,
          },
          telegram: {
            type: String,
          },
          others: {
            type: String,
          },
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
