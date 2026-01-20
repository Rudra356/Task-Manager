import Task from "../models/task.model.js";

export const createTask = (data, userId) => {
  return Task.create({
    ...data,
    userId
  });
};

// supports search, filter and sorting
export const getAllTasks = (userId, query) => {
  const filter = { userId };

  // search in title or description
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }

  // filter by status
  if (query.status) {
    filter.status = query.status;
  }

  // filter by priority
  if (query.priority) {
    filter.priority = query.priority;
  }

  let sortOptions = {};

  // sort by due date
  if (query.sortBy === "dueDate") {
    sortOptions.dueDate = 1;
  }

  // sort by priority
  if (query.sortBy === "priority") {
    sortOptions.priority = 1;
  }

  return Task.find(filter).sort(sortOptions);
};

export const updateTask = (taskId, data) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true });
};

export const deleteTask = (taskId) => {
  return Task.findByIdAndDelete(taskId);
};

// set task status to completed
export const markTaskCompleted = (taskId, userId) => {
  return Task.findOneAndUpdate(
    { _id: taskId, userId },
    { status: "completed" },
    { new: true }
  );
};
