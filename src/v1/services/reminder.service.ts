import { type PrismaClient } from "../../generated/prisma/client";
import { CreateReminder } from "../../types/reminder";
import { getTodoosById } from "./todos.service";

export async function createReminder(prisma: PrismaClient, data: CreateReminder, userId:string){
    const todo = await getTodoosById(prisma, userId, data.todoId);
    if(!todo){
        throw new Error("Todo not found");
    }
    return await prisma.reminder.create({
        data:{
            remindAt: data.remindAt,
            todoId: data.todoId,      
        }
    })
}

export async function getReminder(prisma: PrismaClient, todiId:string,userId:string){
  const toDo = await getTodoosById(prisma, userId, todiId);
  if(!toDo){
    throw new Error("Todo not found");
  }
  return await prisma.reminder.findMany({
    where:{
      todoId: todiId
    }
  });
}

