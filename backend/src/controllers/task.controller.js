import Task from "../models/task.model.js";
import { catchAsync } from "../lib/utils.js";

export const getTasksPerUser = catchAsync(async (req, res) => {
  const loggedInUserId = req.user._id;

  // Get all tasks without the userId
  const filteredTasks = await Task.find({ userId: loggedInUserId }).select(
    "-userId",
  );

  res.status(200).json(filteredTasks);
});

export const getTask = catchAsync(async (req, res) => {
  const loggedInUserId = req.user._id;
  const { id: taskId } = req.params;

  const task = await Task.findOne({
    _id: taskId,
    userId: loggedInUserId,
  }).select("-userId");

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(task);
});

export const createTask = catchAsync(async (req, res) => {
  const { title, dateLimit } = req.body;
  const userId = req.user._id;

  if (!title) {
    const error = new Error("The title is required");
    error.statusCode = 401;
    throw error;
  }

  // Create a new tasks with the defaults of state of false and dateLimit as null if not provided
  const newTask = new Task({
    title,
    state: false,
    dateLimit: !dateLimit ? null : dateLimit,
    userId,
  });

  await newTask.save();

  res.status(201).json(newTask);
});

export const updateTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;
  const userId = req.user._id;

  const { title, state, dateLimit } = req.body;

  if (!title || state === null) {
    const error = new Error("The title and state are required");
    error.statusCode = 401;
    throw error;
  }

  // Finds the task, updates all values, returns the tasks just updated and runs the mongoose validations
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, userId: userId },
    { title, state, dateLimit },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(updatedTask);
});

export const deleteTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;
  const userId = req.user._id;

  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    userId: userId,
  });

  if (!deletedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ message: "Task deleted successfully" });
});
