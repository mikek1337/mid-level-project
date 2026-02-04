import {
    createTodo,
    getTodoosById,
    listTodos,
    updateTodo
} from "../../v1/services/todos.service";



describe("Todos Service Tests", () => {
    let prisma: any;
    let mockData = [
        { id: '1', title: 'Test Todo', userId: '1', markForDelete: false, completed: false, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', title: 'Test Todo', userId: '2', markForDelete: false, completed: false, createdAt: new Date(), updatedAt: new Date() }
    ]
    beforeAll(async () => {
        prisma = {
            todos: {
                create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Todo', userId: '1' }),
                findMany: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Todo', userId: '1', markForDelete: false, completed: false, createdAt: new Date(), updatedAt: new Date() }]),
                findFirst: jest.fn().mockResolvedValue(mockData[0]),
                update: jest.fn().mockResolvedValue({ id: '1', title: 'updated title', userId: '1', markForDelete: false, completed: false, createdAt: new Date(), updatedAt: new Date() })
            }
        };
    });

    it("should create a todo", async () => {
        const todo = await createTodo(prisma, { title: 'Test Todo', userId: '1' });
        expect(prisma.todos.create).toHaveBeenCalledWith({
            data: {
                title: 'Test Todo',
                userId: '1'
            }
        });
        expect(todo).toEqual({ id: '1', title: 'Test Todo', userId: '1' });
    });

    it("should throw error if prisma.todos.create fails", async () => {
        prisma.todos.create.mockRejectedValueOnce(new Error("DB Error"));
        await expect(createTodo(prisma, { title: 'Fail Todo', userId: '1' })).rejects.toThrow("DB Error");
    });

    it("should pass correct data to prisma.todos.create", async () => {
        await createTodo(prisma, { title: 'Another Todo', userId: '1' });
        expect(prisma.todos.create).toHaveBeenCalledWith({
            data: {

                title: 'Another Todo',
                userId: '1'
            }
        });
    });

    it("get list of todos", async () => {
        const todos = await listTodos(prisma, '1');
        expect(prisma.todos.findMany).toHaveBeenCalledWith({
            where: {
                userId: '1',
                markForDelete: false
            }
        });
        expect(todos).toEqual([{ id: '1', title: 'Test Todo', userId: '1', markForDelete: false, completed: false, createdAt: expect.any(Date), updatedAt: expect.any(Date) }]);
    });

    it("get paginated todos", async () => {
        const todos = await listTodos(prisma, '1', 2);
        expect(prisma.todos.findMany).toHaveBeenCalledWith({
            where: {
                userId: '1',
                markForDelete: false
            },
            skip: 10,
            take: 10
        });
        expect(todos).toEqual([{ id: '1', title: 'Test Todo', userId: '1', markForDelete: false, completed: false, createdAt: expect.any(Date), updatedAt: expect.any(Date) }]);
    });

    it("should get todos with id", async () => {
        const todo = await getTodoosById(prisma, '1', '1');
        expect(prisma.todos.findFirst).toHaveBeenCalledWith({
            where: {
                userId: '1',
                id: '1',
                markForDelete: false
            }
        });
        expect(todo).toEqual(mockData[0]);
    });

    it("Should update todo with correct id", async () => {
        const todo = await updateTodo(prisma, '1', '1', { title: 'updated title' });
        expect(prisma.todos.update).toHaveBeenCalledWith({
            where: {
                id: '1',
                userId: '1'
            },
            data: {
                ...mockData[0],
                title: 'updated title'
            }
        });
        expect(todo).toEqual({ id: '1', title: 'updated title', userId: '1', markForDelete: false, completed: false, createdAt: expect.any(Date), updatedAt: expect.any(Date) });
    })




});