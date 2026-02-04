import { Request, Response } from "express";
import { createTodo, getTodoosById, listTodos, updateTodo } from "../services/todos.service";
import { prisma } from "../../utils/db";
import { CreateTodoSchema, TodoSchema } from "../../types/todos";
export async function addTodo(req: Request, res: Response) {
    const newTodo = CreateTodoSchema.parse({ ...req.body, userId: req.user.id });
    const todo = await createTodo(prisma, newTodo);
    res.status(201).json({ message: "Todo created successfully", todo });

}

export async function getTodos(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const todos = await listTodos(prisma, req.user.id, page);
    res.status(200).json({ message: "Todos fetched successfully", todos })
}

export async function getTodo(req: Request, res: Response) {
    const todoId = req.params.id as string;
    if (!todoId) {
        return res.status(400).json({ message: "Todo id is required" });
    }
    const todo = await getTodoosById(prisma, req.user.id, todoId);
    return res.status(200).json({ message: "Todo fetched successfully", todo });
}

export async function updateToDo(req: Request, res: Response) {
    const todoId = req.params.id as string;
    if (!todoId) {
        return res.status(400).json({ message: "Todo id is required" });
    }
    const updateData = TodoSchema.partial().parse(req.body);
    const updatedTodo = await updateTodo(prisma, req.user.id, todoId, updateData);
    res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
}