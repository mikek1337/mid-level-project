import { Router } from "express";
import { IsAuthenticated } from "../../middleware/Authentication";
import { createToDoReminder, reminder } from "../controllers/reminder.controller";




export const reminderRoute = Router();

reminderRoute.use(IsAuthenticated);


reminderRoute.post("/create", createToDoReminder);
reminderRoute.get("/:todoId", reminder);
