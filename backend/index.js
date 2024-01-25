const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 5000;

// middlewares

app.use(express.json());
app.use(cors());
connectToMongo();
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/goals", require("./routes/goals"));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
