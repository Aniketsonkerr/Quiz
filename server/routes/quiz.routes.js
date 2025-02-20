import { Router } from "express";
import {
  getQuestion,
  registerQuestion,
} from "../controllers/quiz.controller.js";

const router = Router();

router.route("/register").post(registerQuestion);

router.route("/questions").get(getQuestion);

export default router;
