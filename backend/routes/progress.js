import express from "express";
const router = express.Router();
import User from "../models/User.js";
import fetchuser from "../middelware/fetchuser.js";
import Progress from "../models/progress.js";

// *update progress
// &logged in is required
// algo
// check if the user is logged in
//check if progress is available ,
//if not avaiable then save it,
//if avaiable then update it
//send the response

router.post("/updateprogress", fetchuser, async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json("Login is required");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return res
      .status(401)
      .json(401, "user does not exist !! create user first");
  }
  const { dailyTasks, monthlyTasks, yearlyTasks, goals } = req.body;

  const progress = await Progress.findOne({ user: req.user.id });
  if (!progress) {
    const newProgress = new Progress({
      user: req.user.id,
      dailyTasks: {
        totalTask: dailyTasks?.totalTask || 0,
        completedTask: dailyTasks?.completedTask || 0,
        inpercentage:
          Math.ceil(
            (dailyTasks?.completedTask / dailyTasks?.totalTask) * 100
          ) || 0,
      },
      monthlyTasks: {
        totalTask: monthlyTasks?.totalTask || 0,
        completedTask: monthlyTasks?.completedTask || 0,
        inpercentage:
          Math.ceil(
            (monthlyTasks?.completedTask / monthlyTasks?.totalTask) * 100
          ) || 0,
      },
      yearlyTasks: {
        totalTask: yearlyTasks?.totalTask || 0,
        completedTask: yearlyTasks?.completedTask || 0,
        inpercentage:
          Math.ceil(
            (yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100
          ) || 0,
      },
      goals: {
        totalTask: goals?.totalTask || 0,
        completedTask: goals?.completedTask || 0,
        inpercentage:
          Math.ceil((goals?.completedTask / goals?.totalTask) * 100) || 0,
      },
    });

    const savedProgress = await newProgress.save();
    if (!savedProgress) {
      return res.status(401).json(401, "Error while saving the progress");
    }
    res.status(200).json({ status: "success1", savedProgress });
  } else {
    const newProgress = {};
    newProgress.dailyTasks = {};
    newProgress.monthlyTasks = {};
    newProgress.yearlyTasks = {};
    newProgress.goals = {};

    newProgress.dailyTasks.completedTask =
      dailyTasks?.completedTask || progress.dailyTasks.completedTask;

    newProgress.dailyTasks.totalTask =
      dailyTasks?.totalTask || progress.dailyTasks.totalTask;

    newProgress.dailyTasks.inpercentage =
      Math.ceil((dailyTasks?.completedTask / dailyTasks?.totalTask) * 100) ||
      progress.dailyTasks.inpercentage;

    newProgress.monthlyTasks.completedTask =
      monthlyTasks?.completedTask || progress.monthlyTasks.completedTask;

    newProgress.monthlyTasks.totalTask =
      monthlyTasks?.totalTask || progress.monthlyTasks.totalTask;

    newProgress.monthlyTasks.inpercentage =
      Math.ceil(
        (monthlyTasks?.completedTask / monthlyTasks?.totalTask) * 100
      ) || progress.monthlyTasks.inpercentage;

    newProgress.yearlyTasks.completedTask =
      yearlyTasks?.completedTask || progress.yearlyTasks.completedTask;

    newProgress.yearlyTasks.totalTask =
      yearlyTasks?.totalTask || progress.yearlyTasks.totalTask;

    newProgress.yearlyTasks.inpercentage =
      Math.ceil((yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100) ||
      progress.yearlyTasks.inpercentage;

    newProgress.goals.completedTask =
      goals?.completedTask || progress.goals.completedTask;

    newProgress.goals.totalTask = goals?.totalTask || progress.goals.totalTask;

    newProgress.goals.inpercentage =
      Math.ceil((goals?.completedTask / goals?.totalTask) * 100) ||
      progress.goals.inpercentage;

    console.log("this is new progress", newProgress);
    const updatedProgress = await Progress.findOneAndUpdate(
      { user: req.user.id },
      {
        dailyTasks: newProgress.dailyTasks,
        monthlyTasks: newProgress.monthlyTasks,
        yearlyTasks: newProgress.yearlyTasks,
        goals: newProgress.goals,
      },
      { new: true }
    );
    if (!updatedProgress) {
      return res.status(401).json(401, "Error while saving the progress");
    }
    res.status(200).json({ status: "success2", updatedProgress });
  }
});

export default router;
