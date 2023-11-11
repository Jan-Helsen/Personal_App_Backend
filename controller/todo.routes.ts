/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Todo:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Todo.
 *                  name:
 *                      type: string
 *                      description: Name of the Todo.
 *                  description:
 *                      type: string
 *                      description: Description of the Todo.
 *                  user:
 *                      type: User
 *                      description: User of the todo.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          Todos:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Todo'
 *          TodoInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the todo.
 *                  description:
 *                      type: string
 *                      description: Description of the todo.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          TodoUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the todo.
 *                  name:
 *                      type: string
 *                      description: Name of the todo.
 *                  description:
 *                      type: string
 *                      description: Description of the todo.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          TodoDelete:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the todo.
 */
import express, { Request, Response } from "express";
import todoService from "../service/todo.service";
import { TodoInput, TodoDelete, TodoUpdateInput } from "../types";

const todoRouter = express.Router();
/**
 * @swagger
 * /todos:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all todos
 *      tags: [Todos]
 *      responses:
 *          200:
 *              description: Returns all todos, if there are no todos, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Todos'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
todoRouter.get("/", async (req: Request, res: Response) => {
    try {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);    
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /todos/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a todo by ID
 *      tags: [Todos]
 *      responses:
 *          200:
 *              description: Returns a todo. If the todo does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Todo'
 *          500:
 *              description: Returns an error
 *              constent:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Todo ID
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 */
todoRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const todo = await todoService.getTodoById({ id: parseInt(req.params.id)});
        res.status(200).json(todo);
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /todos/createtodo:
 *  post:
 *      summary: Add a todo.
 *      tags: [Todos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TodoInput'
 *      responses:
 *          200:
 *              description: The created todo object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Todo'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
todoRouter.post("/createtodo", async (req: Request, res: Response) => {
    const todoInput = <TodoInput>req.body;
    try {
        const todo = await todoService.createTodo(todoInput);
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /todos:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a todo.
 *      tags: [Todos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TodoUpdateInput'
 *      responses:
 *          200:
 *              description: The updated todo object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Todo'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
todoRouter.put("/", async (req: Request, res: Response) => {
    const todoUpdateInput = <TodoUpdateInput>req.body;
    try {
        const todo = await todoService.updateTodo(todoUpdateInput);
        res.status(200).json(todo);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /todos:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a todo.
 *      tags: [Todos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TodoDelete'
 *      responses:
 *          200:
 *              description: Todo that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Todo'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
todoRouter.delete("/", async (req: Request, res: Response) => {
    const todoInput = <TodoDelete>req.body;
    try {
        const todo = await todoService.deleteTodoWithId(todoInput);
        res.status(200).json(todo);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default todoRouter;