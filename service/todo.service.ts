import { TodoInput, TodoDelete, TodoUpdateInput } from "../types";
import todoDb from "../domain/data-access/todo.db";
import { Todo } from "../domain/model/Todo";

const getAllTodos = async (): Promise<Todo[]> => {
    const todos = await todoDb.getAllTodos();
    if (todos.length === 0) {
        throw new Error("No todos found in the database.");
    }
    return todos;
};

const getTodoById = async ({ id }: TodoDelete): Promise<Todo> => {
    if (Number.isNaN(Number(id))) {
        throw new Error("id must be numeric.");
    };
    const todo = await todoDb.getTodoById({ id });
    if (!todo) {
        throw new Error(`Todo with ID: ${id} does not exist.`);
    }
    return todo;
};

const createTodo = async (todoInput: TodoInput): Promise<Todo> => {
    // checks schrijven voor juiste input
    const todo = await todoDb.createTodo(todoInput);
    return todo;
};

const updateTodo = async (todoUpdateInput: TodoUpdateInput): Promise<Todo> => {
    if (Number.isNaN(Number(todoUpdateInput.id))) {
        throw new Error('ID must be numeric.')
    };
    await getTodoById({ id: todoUpdateInput.id });
    // checks schrijven voor juiste input
    const todo = await todoDb.updateTodo(todoUpdateInput);
    return todo;
};

const deleteTodoWithId = async ({ id }: TodoDelete): Promise<Todo> => {
    if (Number.isNaN(Number(id))) {
        throw new Error('ID must be numeric.')
    };
    await getTodoById({ id });
    const todo = await todoDb.deleteTodoWithId({ id });
    return todo;
};

export default {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodoWithId,
};