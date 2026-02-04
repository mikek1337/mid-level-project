import z from "zod";

export const TodoSchema = z.object({
    id: z.string(),
    title: z.string().min(1).max(255),
    userId: z.string(),
    completed: z.boolean().default(false),
    markForDelete: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateTodoSchema = TodoSchema.pick({
    title: true,
    userId: true,
});

export const UpdateTodoSchema = TodoSchema.omit({
    id: true,
    userId: true,
    createdAt:true,
    updatedAt: true,
})

export type Todo = z.infer<typeof TodoSchema>;

export type CreateTodo = z.infer<typeof CreateTodoSchema>;

export type UpdateToDo = z.infer<typeof UpdateTodoSchema>;