import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
  tasks: [],
  selectedTask: null,
  isTasksLoading: false,

  getTasks: async () => {
    set({ isTasksLoading: true });
    try {
      const res = await axiosInstance.get("/task");
      set({ tasks: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isTasksLoading: false });
    }
  },
  createTask: async (data) => {
    try {
    } catch (error) {}
  },
  deleteTask: async (id) => {
    try {
      console.log(id);
      await axiosInstance.delete(`/task/${id}`);

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
      toast.success("Tarea borrada exitosamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  },
}));
