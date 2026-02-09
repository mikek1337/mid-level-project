import z from "zod";

export const ReminderSchema = z.object({
    id: z.string(),
    todoId: z.string(),
    remindAt: z.coerce.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Reminder = z.infer<typeof ReminderSchema>;

export const CreateReminderSchema = ReminderSchema.pick({ todoId: true, remindAt: true,});

export type CreateReminder = z.infer<typeof CreateReminderSchema>;

export const UpdateReminderSchema = ReminderSchema.partial().omit({ id: true, todoId: true, createdAt: true, });

export type UpdateReminder = z.infer<typeof UpdateReminderSchema>;
