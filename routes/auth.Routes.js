import { authRequired } from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  register,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { validateSchema } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);

export default router;
