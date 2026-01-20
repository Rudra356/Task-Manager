import mongoose from "mongoose";
import Task from "../models/task.model.js";

// GET /dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    // priority wise task count
    const priorityStats = await Task.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        }
      }
    ]);

    // completed vs pending etc
    const completionStats = await Task.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // tasks with deadline in next 7 days
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingDeadlines = await Task.find({
      userId: userObjectId,
      dueDate: {
        $gte: today,
        $lte: nextWeek
      }
    }).sort({ dueDate: 1 });

    res.json({
      priorityDistribution: priorityStats,
      completionProgress: completionStats,
      upcomingDeadlines
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
