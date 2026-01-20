import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  completeTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addTask);
router.get("/", authMiddleware, getTasks);

// fetch a single task
router.get("/:id", authMiddleware, getTaskById);

// update whole task
router.put("/:id", authMiddleware, updateTaskById);

// remove task
router.delete("/:id", authMiddleware, deleteTaskById);

// mark task as done
router.patch("/:id/complete", authMiddleware, completeTask);

export default router;
