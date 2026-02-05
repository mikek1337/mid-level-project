import { prisma } from "../../utils/db";
import * as todoService from "../../v1/services/todos.service";
import { createReminder } from "../../v1/services/reminder.service";
describe("Reminder Service", () => {
    jest.mock("../../utils/db")
    let toDoById = jest.spyOn(todoService, 'getTodoosById');
    beforeEach(() => {
        jest.clearAllMocks();

    });
    afterEach(() => {
        jest.clearAllMocks();

    })

    it("Should create a reminder successfully", () => {
        const mockReminder = {
            id: '1',
            todoId: '1',
            remindAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        let mockTodo = [
            { id: '1', title: 'Test Todo', userId: '1', markForDelete: false, completed: false, createdAt: new Date(), updatedAt: new Date() },]
        // (prisma.reminder.create as jest.Mock).mockResolvedValue(mockReminder);
        toDoById.mockResolvedValue(mockTodo[0]);
        createReminder(prisma, { todoId: '1', remindAt: new Date() }, '1').then((reminder) => {
            expect(toDoById).toHaveBeenCalledWith(prisma, '1', '1');
            expect(reminder).toBe(mockReminder);
        })

    })
})