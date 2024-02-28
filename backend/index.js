import express from "express";
import connectToMongo from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authProfileRouter from "./routes/auth&Profile.js";
import tasksRouter from "./routes/tasks.js";
import goalsRouter from "./routes/goals.js";
import processRouter from "./routes/process.js";
import mentorsRouter from "./routes/mentors.js";
import progressRouter from "./routes/progress.js";
import logs from "./routes/Logs.js";

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
await connectToMongo(); // Use await here if connectToMongo is an async function
app.use(cookieParser());

// Routers
app.use("/api/auth", authProfileRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/process", processRouter);
app.use("/api/mentors", mentorsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/logs", logs);

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
