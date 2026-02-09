import { Router } from "express";
import { addTodo, getTodos, markTodoForDeletion, removeToDo, updateToDo } from "../controllers/todo.controller";
import { IsAuthenticated } from "../../middleware/Authentication";
import { reminderRoute } from "./reminder";


export const route = Router();
route.use(IsAuthenticated);
route.post("/todos", addTodo);
route.get('/todos', getTodos);
route.patch("/todos/:id", updateToDo);
route.put("/todos/:id/mark-for-deletion", markTodoForDeletion);
route.delete("/todos/:id", removeToDo);
route.use('/todos/reminder', reminderRoute);
