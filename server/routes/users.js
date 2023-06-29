import express from "express";
import {
  updateUser,
} from "../controllers/user.js";

const user = express.Router();

user.put("/:uid", updateUser);

export default user;