const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("notes", NotesSchema);

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
});
