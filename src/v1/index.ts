import { route as toDoRoute } from "./routes/todo";
import { Router } from "express";

export const v1Router = Router();

v1Router.use("/v1", toDoRoute);