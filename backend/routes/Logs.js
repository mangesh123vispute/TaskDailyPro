import express from "express";
const router = express.Router();
import User from "../models/User.js";
import fetchuser from "../middelware/fetchuser.js";

//*Add or update Daily Logs
//&algo:
//check if the user is logged in , get his id from the local storage auth token
//fetch the data from the front end( req) and validate it
//

export default router;
