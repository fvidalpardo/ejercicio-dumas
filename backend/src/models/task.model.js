import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
      default: false, // If false is pending, if true the task is completed
    },
    dateLimit: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true;

          const today = new Date();
          today.setHours(23, 59, 59, 999); // End of Today if date exists
          return value > today;
        },
        message: "If provided, the date limit must be at least tomorrow!",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
