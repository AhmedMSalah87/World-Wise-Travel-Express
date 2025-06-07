import { createUser, logUser } from "../controller/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", createUser);
router.post("/login", logUser);

export default router;
