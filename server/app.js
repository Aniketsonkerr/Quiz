import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

export { app };

import quizRouter from "../server/routes/quiz.routes.js";
app.use("/api/quiz", quizRouter);
