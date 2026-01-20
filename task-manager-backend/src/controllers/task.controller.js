import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  markTaskCompleted
} from "../services/task.service.js";
import Task from "../models/task.model.js";

export const addTask = async (req, res) => {
  try {
    const newTask = await createTask(req.body, req.userId);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userTasks = await getAllTasks(req.userId, req.query);
    res.json(userTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /tasks/:id/complete
export const completeTask = async (req, res) => {
  try {
    const completedTask = await markTaskCompleted(req.params.id, req.userId);

    if (!completedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(completedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
