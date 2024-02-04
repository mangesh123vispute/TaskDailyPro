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

// &one importent condition to be applied :
//validation:
//completedTask<=TotalTask

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
    // validation
    // case 0: both total task and completed task are  given from the front end, no privios history
    let dailyTasksCompleted = dailyTasks?.completedTask || 0;
    let monthlyTasksCompleted = monthlyTasks?.completedTask || 0;
    let yearlyTasksCompleted = yearlyTasks?.completedTask || 0;
    let goalsCompleted = goals?.completedTask || 0;
    let dailyTotalTask = dailyTasks?.totalTask || 0;
    let monthlyTotalTask = monthlyTasks?.totalTask || 0;
    let yearlyTotalTask = yearlyTasks?.totalTask || 0;
    let goalsTotalTask = goals?.totalTask || 0;

    if (
      dailyTasksCompleted > dailyTotalTask ||
      monthlyTasksCompleted > monthlyTotalTask ||
      yearlyTasksCompleted > yearlyTotalTask ||
      goalsCompleted > goalsTotalTask
    ) {
      return res
        .status(401)
        .json(
          401,
          "invalid input,Input should fulfill the condition: completedTask <= totalTask"
        );
    }
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
    // validation
    // case1 : only completed task is given from the front end
    if (
      (dailyTasks?.completedTask &&
        dailyTasks?.completedTask > progress.dailyTasks.totalTask) ||
      (monthlyTasks?.completedTask &&
        monthlyTasks?.completedTask > progress.monthlyTasks.totalTask) ||
      (yearlyTasks?.completedTask &&
        yearlyTasks?.completedTask > progress.yearlyTasks.totalTask) ||
      (goals?.completedTask && goals?.completedTask > progress.goals.totalTask)
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
      Math.ceil((dailyTasks?.completedTask / dailyTasks?.totalTask) * 100) == 0
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
      Math.ceil((yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100) ==
      0
        ? 0
        : Math.ceil(
            (yearlyTasks?.completedTask / yearlyTasks?.totalTask) * 100
          ) || progress.yearlyTasks.inpercentage;

    newProgress.goals.completedTask =
      goals?.completedTask == 0
        ? 0
        : goals?.completedTask || progress.goals.completedTask;

    newProgress.goals.totalTask =
      goals?.totalTask == 0 ? 0 : goals?.totalTask || progress.goals.totalTask;

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

export default router;
