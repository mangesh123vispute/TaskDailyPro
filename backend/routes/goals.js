const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Goal = require("../models/Goals");
const fetchuser = require("../middelware/fetchuser");

//* algo for create goal:
//* algo for storing the goal data in the database , it is secured method (login is  requied)
// check if the user is logged in , get his id from the local storage auth token (done)
//check if the user exist in the user collection.
// fetch the data from the front end( req) and validate it
// get the user id which is stored in the local storage
// get the model from mongoose
// store the data in the model

// & secured route:login is requierd

router.post("/create_goal", fetchuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id) {
      return res.status(401).json("Login is required");
    }
    const user = await User.findById(user_id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json(401, "user does not exist !! create user first");
    }

    const { goal, description, deadline, tag } = req.body;

    if (!goal || !description || !deadline || !tag) {
      return res.status(400).json("Please add all the fields");
    }
    const newGoal = new Goal({
      user: user_id,
      Goal: goal,
      description: description,
      deadline: deadline,
      tag: tag,
    });
    const savedGoal = await newGoal.save();
    if (!savedGoal) {
      return res.status(401).json(401, "Error while saving the goal");
    }

    res.status(201).json(200, savedGoal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while creating  the goal");
  }
});

//* fetch_all the goals related to the user from Goal model
//* algo to fetchall the user
//& secure method (login is required)

// algo :
//get the user id (from fetchuser middelware)
//find all the record from the using the user_id
//if no record then send the "no record avaliable"
//send response with the all fetched users,

router.post("/fetchallgoals", fetchuser, async (req, res) => {
  const user_id = req.user.id;
  if (!user_id) {
    return res.status(401).json("Login is required");
  }
  const goals = await Goal.find({ user: user_id });
  if (!goals.length) {
    return res.status(401).json("no goals are Set ! ");
  }
  res.status(200).json({ status: "success", goals });
});

//*Delete Goal : Delete an existing goal using: DELETE "/api/goals/deletegoal". Login required

router.delete("/deletegoal/:id", fetchuser, async (req, res) => {
  try {
    // Find the Goal to be delete and delete it
    let goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    goal = await Goal.findByIdAndDelete(req.params.id);
    res.json({ Success: "Goal has been deleted", goal });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// *edit Goal : Update an existing goal using: PUT "/api/goals/updategoal". Login required
// algo
//check if user is logged in
//get details from the front end and make its object
//get id from params
//check if the goal exist or not (if not send error)
//check if user is updating own goal
//update the goal
//send resopnse

router.put("/updategoal/:id", fetchuser, async (req, res) => {
  try {
    const { goal, description, deadline, tag } = req.body;
    const newgoal = {};
    if (!goal || !description || !deadline || !tag) {
      res.status(400).json("Please add all the fields");
    }
    newgoal.goal = goal;
    newgoal.description = description;
    newgoal.deadline = deadline;
    newgoal.tag = tag;

    const oldgoal = await Goal.findById(req.params.id);
    if (!oldgoal) {
      return res.status(404).send("Goal Not Found");
    }
    if (oldgoal.user !== req.user.id) {
      return res.status(401).send("You are Not Allowed change others goal");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: newgoal },
      { new: true }
    );
    res.status(200).json({ goal: updatedGoal });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while updating the goal");
  }
});

module.exports = router;
