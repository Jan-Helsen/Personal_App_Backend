/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Excercise:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Excercise.
 *                  name:
 *                      type: string
 *                      description: Name of the Excercise.
 *                  img:
 *                      type: string
 *                      description: Img url of the Excercise.
 *                  users:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/User'
 *          Excercises:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Excercise'
 *          ExcerciseInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the todo.
 *                  img:
 *                      type: string
 *                      description: Img url of the todo.
 *          ExcerciseUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Excercise.
 *                  name:
 *                      type: string
 *                      description: Name of the Excercise.
 *                  img:
 *                      type: string
 *                      description: Img url of the Excercise.
 *          ExcerciseDelete:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Excercise.
 */
import express, { Request, Response } from "express";
import excerciseService from "../service/excercise.service";
import { ExcerciseInput, ExcerciseDelete, ExcerciseUpdateInput } from "../types";

const excerciseRouter = express.Router();
/**
 * @swagger
 * /excercises:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all excercises
 *      tags: [Excercises]
 *      responses:
 *          200:
 *              description: Returns all excercises, if there are no excercises, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Excercises'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
excerciseRouter.get("/", async (req: Request, res: Response) => {
    try {
        const excercises = await excerciseService.getAllExcercises();
        res.status(200).json(excercises);    
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /excercises/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a excercise by ID
 *      tags: [Excercises]
 *      responses:
 *          200:
 *              description: Returns a excercise. If the excercise does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Excercise'
 *          500:
 *              description: Returns an error
 *              constent:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Excercise ID
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 */
excerciseRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const excercise = await excerciseService.getExcerciseById({ id: parseInt(req.params.id)});
        res.status(200).json(excercise);    
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /excercises/createexcercise:
 *  post:
 *      summary: Add an excercise.
 *      tags: [Excercises]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ExcerciseInput'
 *      responses:
 *          200:
 *              description: The created excercise object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Excercise'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
excerciseRouter.post("/createexcercise", async (req: Request, res: Response) => {
    const excerciseInput = <ExcerciseInput>req.body;
    try {
        const excercise = await excerciseService.createExcercise(excerciseInput);    
        res.status(200).json(excercise);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /excercises:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update an excercise.
 *      tags: [Excercises]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ExcerciseUpdateInput'
 *      responses:
 *          200:
 *              description: The updated excercise object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Excercise'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
excerciseRouter.put("/", async (req: Request, res: Response) => {
    const excerciseUpdateInput = <ExcerciseUpdateInput>req.body;
    try {
        const excercise = await excerciseService.updateExcercise(excerciseUpdateInput);
        res.status(200).json(excercise);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /excercises:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete an excercise.
 *      tags: [Excercises]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ExcerciseDelete'
 *      responses:
 *          200:
 *              description: Excercise that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Excercise'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
excerciseRouter.delete("/", async (req: Request, res: Response) => {
    const excerciseInput = <ExcerciseDelete>req.body;
    try {
        const excercise = await excerciseService.deleteExcerciseWithId(excerciseInput);
        res.status(200).json(excercise);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default excerciseRouter;