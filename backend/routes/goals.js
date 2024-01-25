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
module.exports = router;
