/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Deadline:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Deadline.
 *                  name:
 *                      type: string
 *                      description: Name of the Deadline.
 *                  subject:
 *                      type: string
 *                      description: Subject of the Deadline.
 *                  description:
 *                      type: string
 *                      description: Description of the Deadline.
 *                  endDate:
 *                      type: Date
 *                      description: End date of the Deadline.
 *                  user:
 *                      type: User
 *                      description: User of the todo.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          Deadlines:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Deadline'
 *          DeadlineInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the Deadline.
 *                  subject:
 *                      type: string
 *                      description: Subject of the Deadline.
 *                  description:
 *                      type: string
 *                      description: Description of the Deadline.
 *                  endDate:
 *                      type: Date
 *                      description: End date of the Deadline.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          DeadlineUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the Deadline.
 *                  name:
 *                      type: string
 *                      description: Name of the Deadline.
 *                  subject:
 *                      type: string
 *                      description: Subject of the Deadline.
 *                  description:
 *                      type: string
 *                      description: Description of the Deadline.
 *                  endDate:
 *                      type: Date
 *                      description: End date of the Deadline.
 *                  userId:
 *                      type: number
 *                      description: Id of the user.
 *          DeadlineDelete:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the deadline.
 */
import express, { Request, Response } from "express";
import deadlineService from "../service/deadline.service";
import { DeadlineInput, DeadlineDelete, DeadlineUpdateInput } from "../types";

const deadlineRouter = express.Router();
/**
 * @swagger
 * /deadlines:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all deadlines
 *      tags: [Deadline]
 *      responses:
 *          200:
 *              description: Returns all deadlines, if there are no deadlines, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deadlines'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
deadlineRouter.get("/", async (req: Request, res: Response) => {
    try {
        const deadlines = await deadlineService.getAllDeadlines();
        res.status(200).json(deadlines);    
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /deadlines/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a deadlines by ID.
 *      tags: [Deadline]
 *      responses:
 *          200:
 *              description: Returns a deadline, if the deadline does not exit, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deadline'
 *          500:
 *              description: Returns an error
 *              content:
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
deadlineRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const deadline = await deadlineService.getDeadlineById({ id: parseInt(req.params.id) });
        res.status(200).json(deadline);
    }
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
})
/**
 * @swagger
 * /deadlines/createdeadline:
 *  post:
 *      summary: Add a deadline.
 *      tags: [Deadline]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DeadlineInput'
 *      responses:
 *          200:
 *              description: The created deadline object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deadline'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
deadlineRouter.post("/createdeadline", async (req: Request, res: Response) => {
    const deadlineInput = <DeadlineInput>req.body;
    try {
        const deadline = await deadlineService.createDeadline(deadlineInput);
        res.status(200).json(deadline);    
    }
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /deadlines:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a deadline.
 *      tags: [Deadline]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DeadlineUpdateInput'
 *      responses:
 *          200:
 *              description: The updated deadline object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deadline'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
deadlineRouter.put("/", async (req: Request, res: Response) => {
    const deadlineUpdateInput = <DeadlineUpdateInput>req.body;
    try {
        const deadline = await deadlineService.updateDeadline(deadlineUpdateInput);
        res.status(200).json(deadline);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /deadlines:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a deadline.
 *      tags: [Deadline]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DeadlineDelete'
 *      responses:
 *          200:
 *              description: Deadline that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Deadline'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
deadlineRouter.delete("/", async (req: Request, res: Response) => {
    const deadlineInput = <DeadlineDelete>req.body;
    try {
        const deadline = await deadlineService.deleteDeadlineWithId(deadlineInput);
        res.status(200).json(deadline);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default deadlineRouter;