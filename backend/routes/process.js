import express from "express";
const router = express.Router();
import fetchuser from "../middelware/fetchuser.js";
import Process from "../models/process.js";
import Goals from "../models/Goals.js";
import User from "../models/User.js";

//^ crud for the process elements

//* Add process elements .(create)
// algo
// check if the user is logged in , get his id from the local storage auth token
//get the goal id
//get the data from the front end and validate it
// if your model(process model) has no process objects in it , then add it else append new object to the existing task array of obejct
//save it and send the resonse ..

// & secured route:login is requierd

router.post("/addTask", fetchuser, async (req, res) => {
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

//* get all process elements .(read)
//& secured route:login is requierd
// algo
//check if the user is logged in , get his id from the local storage auth token
//get the goal id
//fetch  the process of that goal id  from the database using the model
//get task array from it
//retrun it
//done

router.post("/fetchallprocess", fetchuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id) {
      return res.status(401).json("Login is required");
    }
    const process = await Process.find({ GoalId: req.body.goalId });
    if (!process.length) {
      return res.status(401).json("no process are Set ! ");
    }
    const tasks = process[0].tasks;

    res.status(200).json({ status: "success", tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// * Update task in the process
// & secured route:login is requierd
// algo
//check if the user is logged in , get his id from the local storage auth token
// get the goal id
// get the process id from param
// get the data from the front end and validate it
//fetch process related to the goalid
//loop on the process[0].task arry and update the task with the given id
// save it and send the response

router.put("/updatetask/:id", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(401)
        .json("User Not Found for which you want to update the process");
    }

    const { goalId, task, details } = req.body;
    const process = await Process.find({ GoalId: goalId });
    const goal = await Goals.findById(goalId);
    if (!goal) {
      return res
        .status(401)
        .json("Goal Not Found for which you want to update the process");
    }
    if (!process.length) {
      return res
        .status(401)
        .json("Process Not Found for which you want to update the process");
    }
    if (!task.currentId) {
      return res.status(401).json({
        status: "error",
        message: "CurrentId is required to update the task",
      });
    }
    if (Number(task.currentId !== Number(req.params.id))) {
      return res.status(404).json({
        status: "error",
        message: "currentId and id in the url must be same",
      });
    }
    if (
      (!(Number(task.currentId) === Number(task.id)) &&
        process[0].tasks.some((ts) => Number(ts.id) === Number(task?.id))) ||
      !process[0].tasks.some((tk) => Number(tk.id) === Number(req.params.id))
    ) {
      let ids = process[0].tasks.map((tk) => Number(tk.id));
      return res.status(401).json({
        status: "error",
        message: `1.No two tasks can have the same id or 2.No task with given id found in process, verify your id from existing ids: ${ids}  `,
      });
    }

    if (task) {
      for (let t of process[0].tasks) {
        if (
          Number(t.id) === Number(req.params.id) &&
          Number(task.currentId) === Number(req.params.id) &&
          Number(task.currentId) === Number(t.id)
        ) {
          if (task?.id) {
            t.id = task?.id;
          }
          if (task?.name) {
            t.name = task?.name;
          }
          if (task?.description) {
            t.description = task?.description;
          }
          if (task?.startdate) {
            t.startdate = task?.startdate;
          }
          if (task?.enddate) {
            t.enddate = task?.enddate;
          }
          if (task?.iscompleted) {
            t.iscompleted = task?.iscompleted;
          }
        }
      }
    }

    if (details.reviewedBy) {
      process[0].details.reviewedBy = details.reviewedBy;
    }
    if (details.verifiedBy) {
      process[0].details.verifiedBy = details.verifiedBy;
    }
    if (details.accuracy) {
      process[0].details.accuracy = details.accuracy;
    }

    const savedProcess = await process[0].save();
    if (!savedProcess) {
      return res.status(401).json(401, "Error while saving the process");
    }
    res.status(200).json({ status: "success", savedProcess });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//delete task in the process
// & secured route:login is requierd

//algo :
//check if the user is logged in , get his id from the local storage auth token
// get the process id from the params
//get goalid from the req body and find the process on the based on that
//check if the process(record ) exist in the database
//check if task is exist in the process if not send the error
//if exist then find the array of tasks , filter those element which dose not have the same id
//update this array in the database
//send the response

router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }

    const { goalId } = req.body;
    const process = await Process.find({ GoalId: goalId });
    if (!process.length) {
      return res
        .status(401)
        .json("Process Not Found for which you want to delete the task");
    }

    if (
      process[0].tasks.filter((t) => {
        return Number(t.id) === Number(req.params.id);
      }).length === 0
    ) {
      return res
        .status(400)
        .json("Task Not Found,Please provide valid task id ");
    }

    const newTasks = process[0].tasks.filter(
      (t) => Number(t.id) !== Number(req.params.id)
    );

    const savedProcess = await Process.findOneAndUpdate(
      { GoalId: goalId },
      { $set: { tasks: newTasks } },
      { new: true }
    );

    if (!savedProcess) {
      return res.status(401).json(401, "Error while saving updated process ");
    }
    res.status(200).json({ status: "success", savedProcess });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//*delete whole process.
// algo
//check if the user is logged in , get his id from the local storage auth token
//get the goal id from the req body
//check if the process exist in the database
//delete it if exist
//return the response

router.delete("/deleteprocess", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }
    const { goalId } = req.body;
    const process = await Process.find({ GoalId: goalId });
    if (!process.length) {
      return res
        .status(401)
        .json("Process Not Found for which you want to delete the process");
    }
    const deletedProcess = await Process.findOneAndDelete({ GoalId: goalId });
    if (!deletedProcess) {
      return res.status(401).json(401, "Error while deleting the process ");
    }
    res.status(200).json({ status: "success", deletedProcess });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

export default router;
