import { type PrismaClient, type todos } from "../../generated/prisma/client";
import { CreateTodo, Todo, UpdateToDo } from "../../types/todos";



export async function createTodo(prisma: PrismaClient, data: CreateTodo): Promise<todos> {
    return await prisma.todos.create({
        data: {
            title: data.title,
            userId: data.userId,

        }
    })
}

export async function listTodos(prisma: PrismaClient, userId: string, page?:number ): Promise<todos[]>{
    if (page !== undefined) {
        const pageSize = 10;
        const skip = page && page > 0 ? (page - 1) * pageSize : 0;
        return await prisma.todos.findMany({
            where: {
                userId: userId,
                markForDelete: false
            },
            skip: skip,
            take: pageSize
        });
    } else {
        return await prisma.todos.findMany({
            where: {
                userId: userId,
                markForDelete: false
            }
        });
    }
}

export async function getTodoosById(prisma: PrismaClient, userId: string, id: string): Promise<todos | null> {
    return await prisma.todos.findFirst({
        where: {
            userId: userId,
            id: id,
            markForDelete: false
        }
    });
}

export async function updateTodo(prisma: PrismaClient, userId: string, id: string, data: Partial<UpdateToDo>): Promise<todos>{
    const todo = await getTodoosById(prisma, userId, id);
    if(!todo){
        throw Error("Todo not Found");
    }
    const{id:todoId, ...rest} = todo
    return await prisma.todos.update({
        where:{
            id: id,
            userId: userId,
        },
        data:{
            ...rest,
            ...data
        }
    })
}

export async function markForDeletion(prisma:PrismaClient, userId: string, id: string): Promise<todos>{
    const updatedTodo = await updateTodo(prisma, userId, id, { markForDelete: true});
    return updatedTodo
}

export async function deleteToDo(prisma: PrismaClient, userId: string, id: string): Promise<todos>{
    const todo = await getTodoosById(prisma, userId, id);
    if(!todo){
        throw Error("Todo not Found");
    }
    return await prisma.todos.delete({
        where:{
            id: id,
            userId: userId,
        }
    });
}
