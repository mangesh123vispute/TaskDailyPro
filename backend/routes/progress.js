import express from "express";
const router = express.Router();
import User from "../models/User.js";
import fetchuser from "../middelware/fetchuser.js";
import Progress from "../models/progress.js";
import Goal from "../models/Goals.js";
import Daily from "../models/DailyTasks.js";
import Monthly from "../models/Monthly.js";
import Yearly from "../models/Yearly.js";

// *update progress
// &logged in is required
// algo
// check if the user is logged in
//check if progress is available ,
//if not avaiable then save it,
//if avaiable then update it
//send the response

// &one importent condition to be applied :
//validation:
//completedTask<=TotalTask

router.post("/updateprogress", fetchuser, async (req, res) => {
  try {
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

    //if progress is not initilized then initilize it by creating a new progress with total task/goals availabe in the database
    if (!progress) {
      let totalDailyTask = 0;
      let totalMonthlyTask = 0;
      let totalYearlyTask = 0;
      let totalGoal = 0;

      const dailyTasks = await Daily.find({ user: req.user.id });
      totalDailyTask = dailyTasks.length;

      const monthlyTasks = await Monthly.find({ user: req.user.id });
      totalMonthlyTask = monthlyTasks.length;

      const yearlyTasks = await Yearly.find({ user: req.user.id });
      totalYearlyTask = yearlyTasks.length;

      const goalTasks = await Goal.find({ user: req.user.id });
      totalGoal = goalTasks.length;

      const newProgress = new Progress({
        user: req.user.id,
        dailyTasks: {
          totalTask: totalDailyTask || 0,
          completedTask: dailyTasks?.completedTask || 0,
          inpercentage:
            dailyTasks?.totalTask == 0 && dailyTasks?.completedTask == 0
              ? 0
              : Math.ceil(
                  (dailyTasks?.completedTask / dailyTasks?.totalTask) * 100
                ) || 0,
        },
        monthlyTasks: {
          totalTask: totalMonthlyTask || 0,
          completedTask: monthlyTasks?.completedTask || 0,
          inpercentage:
            monthlyTasks?.totalTask == 0 && monthlyTasks?.completedTask == 0
              ? 0
              : Math.ceil(
                  (monthlyTasks?.completedTask / monthlyTasks?.totalTask) * 100
                ) || 0,
        },
        yearlyTasks: {
          totalTask: totalYearlyTask || 0,
          completedTask: yearlyTasks?.completedTask || 0,
          inpercentage:
            yearlyTasks?.totalTask == 0 && yearlyTasks?.completedTask == 0
              ? 0
              : Math.ceil(
                  (yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100
                ) || 0,
        },
        goals: {
          totalTask: totalGoal || 0,
          completedTask: goals?.completedTask || 0,
          inpercentage:
            goals?.totalTask == 0 && goals?.completedTask == 0
              ? 0
              : Math.ceil((goals?.completedTask / goals?.totalTask) * 100) || 0,
        },
      });

      const savedProgress = await newProgress.save();
      if (!savedProgress) {
        return res.status(401).json(401, "Error while saving the progress");
      }
      res.status(200).json({ status: "success1", savedProgress });
    } else {
      // validation
      // case1 : only completed task is given from the front end
      if (
        (dailyTasks?.completedTask &&
          dailyTasks?.completedTask > progress.dailyTasks.totalTask) ||
        (monthlyTasks?.completedTask &&
          monthlyTasks?.completedTask > progress.monthlyTasks.totalTask) ||
        (yearlyTasks?.completedTask &&
          yearlyTasks?.completedTask > progress.yearlyTasks.totalTask) ||
        (goals?.completedTask &&
          goals?.completedTask > progress.goals.totalTask)
      ) {
        return res
          .status(401)
          .json(
            401,
            "invalid input,Input should fulfill the condition: completedTask <= totalTask"
          );
      }

      // case2 : only total task is given from the front end
      if (
        (dailyTasks?.totalTask &&
          dailyTasks?.totalTask < progress.dailyTasks.completedTask) ||
        (monthlyTasks?.totalTask &&
          monthlyTasks?.totalTask < progress.monthlyTasks.completedTask) ||
        (yearlyTasks?.totalTask &&
          yearlyTasks?.totalTask < progress.yearlyTasks.completedTask) ||
        (goals?.totalTask && goals?.totalTask < progress.goals.completedTask)
      ) {
        return res
          .status(401)
          .json(
            401,
            "invalid input,Input should fulfill the condition: completedTask <= totalTask"
          );
      }
      const newProgress = {};
      newProgress.dailyTasks = {};
      newProgress.monthlyTasks = {};
      newProgress.yearlyTasks = {};
      newProgress.goals = {};

      newProgress.dailyTasks.completedTask =
        dailyTasks?.completedTask == 0
          ? 0
          : dailyTasks?.completedTask || progress.dailyTasks.completedTask;

      newProgress.dailyTasks.totalTask =
        dailyTasks?.totalTask == 0
          ? 0
          : dailyTasks?.totalTask || progress.dailyTasks.totalTask;

      newProgress.dailyTasks.inpercentage =
        Math.ceil((dailyTasks?.completedTask / dailyTasks?.totalTask) * 100) ==
        0
          ? 0
          : Math.ceil(
              (dailyTasks?.completedTask / dailyTasks?.totalTask) * 100
            ) || progress.dailyTasks.inpercentage;
      console.log(newProgress.dailyTasks.inpercentage);

      newProgress.monthlyTasks.completedTask =
        monthlyTasks?.completedTask == 0
          ? 0
          : monthlyTasks?.completedTask || progress.monthlyTasks.completedTask;

      newProgress.monthlyTasks.totalTask =
        monthlyTasks?.totalTask == 0
          ? 0
          : monthlyTasks?.totalTask || progress.monthlyTasks.totalTask;

      newProgress.monthlyTasks.inpercentage =
        Math.ceil(
          (monthlyTasks?.completedTask / monthlyTasks?.totalTask) * 100
        ) == 0
          ? 0
          : Math.ceil(
              (monthlyTasks?.completedTask / monthlyTasks?.totalTask) * 100
            ) || progress.monthlyTasks.inpercentage;

      newProgress.yearlyTasks.completedTask =
        yearlyTasks?.completedTask == 0
          ? 0
          : yearlyTasks?.completedTask || progress.yearlyTasks.completedTask;

      newProgress.yearlyTasks.totalTask =
        yearlyTasks?.totalTask == 0
          ? 0
          : yearlyTasks?.totalTask || progress.yearlyTasks.totalTask;

      newProgress.yearlyTasks.inpercentage =
        Math.ceil(
          (yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100
        ) == 0
          ? 0
          : Math.ceil(
              (yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100
            ) || progress.yearlyTasks.inpercentage;

      newProgress.goals.completedTask =
        goals?.completedTask == 0
          ? 0
          : goals?.completedTask || progress.goals.completedTask;

      newProgress.goals.totalTask =
        goals?.totalTask == 0
          ? 0
          : goals?.totalTask || progress.goals.totalTask;

      newProgress.goals.inpercentage =
        Math.ceil((goals?.completedTask / goals?.totalTask) * 100) == 0
          ? 0
          : Math.ceil((goals?.completedTask / goals?.totalTask) * 100) ||
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

//* get progress
//& logged in is required

//algo
//check if the user is logged in , get his id from the local storage auth token
//get the user id and find the progress on the based on that
// if exist then send the response

router.get("/getprogress", fetchuser, async (req, res) => {
  if (!req.user.id) {
    return res.status(401).json("Login is required");
  }
  const progress = await Progress.findOne({ user: req.user.id });
  if (!progress) {
    return res
      .status(401)
      .json(401, "user does not exist !! create user first");
  }
  res.status(200).json({ status: "success", progress });
});

// reset progress
//& login required
//check user is logged in first if not send error message
//check which progress you want to reset , use bool
//check if which progress to be reset
//reset the task : compelted task and Total task =0
//return the response

router.post("/resetprogress", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "user does not exist" });
    }
    const { Task } = req.body;
    switch (Task) {
      case "daily":
        await Progress.findOneAndUpdate(
          { user: req.user.id },
          {
            dailyTasks: {
              completedTask: 0,
              totalTask: 0,
              inpercentage: 0,
            },
          }
        );
        break;
      case "monthly":
        await Progress.findOneAndUpdate(
          { user: req.user.id },
          {
            monthlyTasks: {
              completedTask: 0,
              totalTask: 0,
              inpercentage: 0,
            },
          }
        );
        break;
      case "yearly":
        await Progress.findOneAndUpdate(
          { user: req.user.id },
          {
            yearlyTasks: {
              completedTask: 0,
              totalTask: 0,
              inpercentage: 0,
            },
          }
        );
        break;
      case "goals":
        await Progress.findOneAndUpdate(
          { user: req.user.id },
          {
            goals: {
              completedTask: 0,
              totalTask: 0,
              inpercentage: 0,
            },
          }
        );
        break;
    }
    res
      .status(200)
      .json({ status: "success", message: `${Task} progress reseted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
