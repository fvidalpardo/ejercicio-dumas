import express from "express";
import { protectRoute } from "../middlewares/task.middleware.js";
import {
  createTask,
  getTasksPerUser,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", protectRoute, getTasksPerUser);
router.get("/:id", protectRoute, getTask);
router.post("/", protectRoute, createTask);
router.put("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;
