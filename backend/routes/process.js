const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middelware/fetchuser");
const Process = require("../models/process");

//* Add process elements .
// algo
// check if the user is logged in , get his id from the local storage auth token
//get the data from the front end and validate it

module.exports = router;
