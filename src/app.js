import express from "express";
import morgan from "morgan";
import UserRouter from "./routes/auth.Routes.js";
import cookieParser from "cookie-parser";
import TasksRoutes from "./routes/tasks.Routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", UserRouter);
app.use("/api", TasksRoutes);

export default app;
