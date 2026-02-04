import { Router } from "express";
import { addTodo, getTodos, updateToDo } from "../controllers/todo.controller";
import { IsAuthenticated } from "../../middleware/Authentication";


export const route = Router();
route.use(IsAuthenticated);
route.post("/todos", addTodo);
route.get('/todos', getTodos);
route.patch("/todos/:id", updateToDo);

