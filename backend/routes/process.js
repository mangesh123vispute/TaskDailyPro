const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middelware/fetchuser");
const Process = require("../models/process");
const Goals = require("../models/Goals");

//* Add process elements .
// algo
// check if the user is logged in , get his id from the local storage auth token
//get the goal id
//get the data from the front end and validate it
// if your model(process model) has no process objects in it , then add it else append new object to the existing task array of obejct
//save it and send the resonse ..

// & secured route:login is requierd

router.post("/addprocess", fetchuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id) {
      return res.status(401).json("Login is required");
    }
    const { goalId, task } = req.body;
    if (!goalId || !task) {
      return res.status(401).json("Please add all the fields ");
    }

    if (!task.name || !task.id || !task.description) {
      return res.status(401).json("Name , id and description are required");
    }
    const goal = await Goals.findById(goalId);
    if (!goal) {
      return res
        .status(401)
        .json("Goal Not Found for which you want to add the process");
    }

    let savedProcess = undefined;
    const process = await Process.find({ GoalId: goalId });
    if (!process.length) {
      const newProcess = new Process({
        GoalId: goalId,
        tasks: [
          {
            id: task?.id,
            name: task?.name,
            description: task?.description,
            startdate: task?.startdate,
            enddate: task?.enddate,
            iscompleted: task?.iscompleted,
          },
        ],
      });
      savedProcess = await newProcess.save();
      if (!savedProcess) {
        return res.status(401).json(401, "Error while saving the process");
      }
    } else {
      if (process[0].tasks.some((t) => t?.id === task?.id)) {
        return res.status(401).json({
          status: "error",
          message:
            "No two tasks can have the same id, please give different id ",
        });
      }

      process[0].tasks.push({
        id: task?.id,
        name: task?.name,
        startdate: task?.startdate,
        enddate: task?.enddate,
        description: task?.description,
        iscompleted: task?.iscompleted,
      });
      savedProcess = await process[0].save();
      if (!savedProcess) {
        return res.status(401).json(402, "Error while saving the process");
      }
    }

    res.status(200).json({ status: "success", savedProcess });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
