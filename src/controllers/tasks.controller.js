import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  try {
    const task = await Task.find({
      user: req.user.id,
    }).populate("user");
    if (!task) return res.status(400).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const TaskSaved = await newTask.save();
    res.json(TaskSaved);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(400).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(400).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(204).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.log(error);
  }
};
