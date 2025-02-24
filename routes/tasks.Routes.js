import { authRequired } from "../middleware/auth.middleware.js";
import {
  createTasks,
  deleteTasks,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";
import { Router } from "express";
import { validateSchema } from "../middleware/validate.middleware.js";
import { createTasksSchema } from "../schemas/tasks.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTasksSchema),
  createTasks
);
router.put("/tasks/:id", authRequired, updateTask);
router.delete("/tasks/:id", authRequired, deleteTasks);

export default router;
