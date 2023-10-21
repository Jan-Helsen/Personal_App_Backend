import { TodoInput, TodoDelete, TodoUpdateInput } from "../../types";
import { mapToTodo, mapToTodos } from "./mappers/todo.mapper";
import { Todo } from "../model/Todo";
import database from "./database";

const getAllTodos = async (): Promise<Todo[]> => {
    try {
        const todosPrisma = await database.todo.findMany({
            include: { user: true },
        });
        return mapToTodos(todosPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const getTodoById = async ({ id }: TodoDelete): Promise<Todo> => {
    try {
        const todoPrisma = await database.todo.findUnique({
            where: { id },
            include: { user: true },
        });
        return mapToTodo(todoPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const createTodo = async (todo: TodoInput): Promise<Todo> => {
    try {
        const todoPrisma = await database.todo.create({
            data: todo
        });
        return mapToTodo(todoPrisma); 
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

const updateTodo = async (todoUpdateInput: TodoUpdateInput): Promise<Todo> => {
    try {
        const todoPrisma = await database.todo.update({
            where: { id: todoUpdateInput.id },
            data: {
                name: todoUpdateInput.name,
                description: todoUpdateInput.description,
                userId: todoUpdateInput.userId,
            }
        });
        return mapToTodo(todoPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")        
    }
};

const deleteTodoWithId = async ({ id }: TodoDelete): Promise<Todo> => {
    try {
        const todoPrisma = await database.todo.delete({
            where: { id },
        });
        return mapToTodo(todoPrisma);
    } 
    catch (error) {
        console.log(error)
        throw new Error("error database check logs")
    }
};

export default {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodoWithId,
};