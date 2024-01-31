const express = require("express");
const router = express.Router();
const fetchuser = require("../middelware/fetchuser");
const Goal = require("../models/Goals");
const User = require("../models/User");
const Mentors = require("../models/Mentors");

//^crud ,

//* create mentor  secured route (login is requierd)
//algo :
// check if the user is logged in , get his id from the local storage auth token
// verify the user and his goal are linked with each other to with id
// if not send the error
// get goal id , mentor data from the front end and then create the goal.
//send the response

router.post("/create_mentor", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }
    const doesUserExist = await User.findById(req.user.id);
    if (!doesUserExist) {
      return res
        .status(404)
        .json("User not found for which you want to add mentor");
    }
    const { GoalId, mentor } = req.body;
    if (
      !GoalId ||
      !mentor ||
      !mentor.contacts ||
      !mentor.name ||
      !mentor.achivements
    ) {
      return res
        .status(401)
        .json(
          "GoalId,mentor name,at least one contact detail ,achivements are required"
        );
    }
    const goal = await Goal.findById(GoalId);
    if (!goal) {
      return res.status(404).json("Goal not found");
    }
    const user = await User.findById(req.user.id);
    if (String(user.id) !== String(goal.user)) {
      console.log(user.id, goal.user);
      return res.status(401).json("You can add only your goals");
    }
    const MentorListObject = {};
    const NewMentor = {};
    NewMentor.contacts = {};

    if (mentor.name) {
      NewMentor.name = mentor.name;
    }
    if (mentor.achivements) {
      NewMentor.achivements = mentor.achivements;
    }
    if (mentor.suggestions) {
      NewMentor.suggestions = mentor.suggestions;
    }
    if (mentor.contacts) {
      if (mentor.contacts.whatsapp) {
        console.log(mentor.contacts.whatsapp);
        NewMentor.contacts.whatsapp = mentor.contacts.whatsapp;
        console.log(NewMentor.contacts.whatsapp);
      }
      if (mentor.contacts.mobNumber) {
        NewMentor.contacts.mobNumber = mentor.contacts.mobNumber;
      }
      if (mentor.contacts.insta) {
        NewMentor.contacts.insta = mentor.contacts.insta;
      }
      if (mentor.contacts.linkedin) {
        NewMentor.contacts.linkedin = mentor.contacts.linkedin;
      }
      if (mentor.contacts.telegram) {
        NewMentor.contacts.telegram = mentor.contacts.telegram;
      }
      if (mentor.contacts.others) {
        NewMentor.contacts.others = mentor.contacts.others;
      }
    }
    MentorListObject.mentors = NewMentor;
    MentorListObject.GoalId = GoalId;

    const oldMentor = await Mentors.find({ GoalId: GoalId });
    if (!oldMentor.length) {
      const newMentor = new Mentors(MentorListObject);
      await newMentor.save();
      res.status(200).json({ status: "success", newMentor });
    } else {
      const updatedMentor = await Mentors.findOneAndUpdate(
        { GoalId: GoalId },
        { $push: { mentors: NewMentor } },
        { new: true }
      );
      res.status(200).json({ status: "success", updatedMentor });
    }
  } catch (error) {
    res.status(500).json("Error while saving the mentor " + error);
  }
});

// *get all mentors

// algo
//check if user is logged in and user document is presnet in the database, as well as userId which is in the database and in the goal.userId must be same
//if not send the error
//find all the mentors from goal id
//send the response

router.post("/getallmentors", fetchuser, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json("Login is required");
    }
    const doesUserExist = await User.findById(req.user.id);
    if (!doesUserExist) {
      return res
        .status(404)
        .json("User not found for which you want to add mentor");
    }
    const { GoalId } = req.body;
    const goal = await Goal.findById(GoalId);
    if (String(goal.user) !== String(req.user.id)) {
      return res.status(401).json("You can add only your goals");
    }
    const mentors = await Mentors.find({ GoalId: GoalId });
    res.status(200).json({ status: "success", mentors });
  } catch (error) {
    res.status(500).json("Error while getting the mentors " + error);
  }
});

//update mentor

module.exports = router;
