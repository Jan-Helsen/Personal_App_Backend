/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Habit:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the habit.
 *                  name:
 *                      type: string
 *                      description: Name of the habit.
 *                  description:
 *                      type: string
 *                      description: Description of the habit.
 *                  updatedAt:
 *                      type: Date
 *                      description: time of last update.
 *                  streak:
 *                      type: number
 *                      description: Time of streak for the habit ann user.
 *                  user:
 *                      type: User
 *                      description: User of the habit.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          Habits:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Habit'
 *          HabitInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the habit.
 *                  description:
 *                      type: string
 *                      description: Description of the habit.
 *                  updatedAt:
 *                      type: Date
 *                      description: time of last update.
 *                  streak:
 *                      type: number
 *                      description: Time of streak for the habit ann user.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          HabitUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the habit.
 *                  name:
 *                      type: string
 *                      description: Name of the habit.
 *                  description:
 *                      type: string
 *                      description: Description of the habit.
 *                  updatedAt:
 *                      type: Date
 *                      description: time of last update.
 *                  streak:
 *                      type: number
 *                      description: Time of streak for the habit and user.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          HabitDelete:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the habit.
 *          HabitError:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                      description: Status of the error
 *                  message:
 *                      type: string
 *                      description: Information about the error.
 */
import express, { Request, Response } from "express";
import habitService from "../service/habit.service";
import { HabitInput, HabitDelete, HabitUpdateInput } from "../types";

const habitRouter = express.Router();
/**
 * @swagger
 * /habits:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all habits
 *      responses:
 *          200:
 *              description: Returns all habits, if there are no habits, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Habits'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HabitError'
 */
habitRouter.get("/", async (req: Request, res: Response) => {
    try {
        const habits = await habitService.getAllHabits();
        res.status(200).json(habits);    
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message }); 
    }
});
/**
 * @swagger
 * /habits/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a habit by ID
 *      responses:
 *          200:
 *              description: Returns a habit. If the habit does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Habit'
 *          500:
 *              description: Returns an error
 *              constent:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HabitError'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Habit ID
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 */
habitRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const habit = await habitService.getHabitById({ id: parseInt(req.params.id) })
        res.status(200).json(habit);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message}); 
    }
});
/**
 * @swagger
 * /habits/createhabit:
 *  post:
 *      summary: Add a habit.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HabitInput'
 *      responses:
 *          200:
 *              description: The created habit object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Habit'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HabitError'
 */
habitRouter.post("/createhabit", async (req: Request, res: Response) => {
    const habitInput = <HabitInput>req.body;
    try {
        const habit = await habitService.createHabit(habitInput);
        res.status(200).json(habit);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /habits:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a habit.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HabitUpdateInput'
 *      responses:
 *          200:
 *              description: The updated habit object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Habit'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HabitError'
 */
habitRouter.put("/", async (req: Request, res: Response) => {
    const habitInput = <HabitUpdateInput>req.body;
    try {
        const habit = await habitService.updateHabit(habitInput);    
        res.status(200).json(habit);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /habits:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a habit.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HabitDelete'
 *      responses:
 *          200:
 *              description: Habit that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Habit'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HabitError'
 */
habitRouter.delete("/", async (req: Request, res: Response) => {
    const habitInput = <HabitDelete>req.body;
    try {
        const habit = await habitService.deleteHabitWithId(habitInput);
        res.status(200).json(habit);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default habitRouter;