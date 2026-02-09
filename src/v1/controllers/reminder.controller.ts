import { Request, Response } from "express";
import { CreateReminderSchema } from "../../types/reminder";
import { createReminder, getReminder } from "../services/reminder.service";
import { prisma } from "../../utils/db";


export async function createToDoReminder(req: Request, res: Response){
    const reminderData = CreateReminderSchema.parse(req.body);
    const reminder = await createReminder(prisma, reminderData, req.user.id);
    res.status(201).json({message: "Reminder created successfully", reminder});
}

export async function reminder(req: Request, res: Response){
  const {todoId} = req.params;
  const reminder = await getReminder(prisma,todoId as string, req.user.id);
  res.status(200).json({message: "Reminder fetched successfully", reminder});
}
