/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          UserOnExcercise:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: integer
 *                      format: int64
 *                  excercisesId:
 *                      type: integer
 *                      format: int64
 *                  eightRepMax:
 *                      type: integer
 *                      format: int64
 *                  tenRepMax:
 *                      type: integer
 *                      format: int64
 *                  twelveRepMax:
 *                      type: integer
 *                      format: int64
 *          UserOnExcerciseInput:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: integer
 *                      format: int64
 *                  excerciseId:
 *                      type: integer
 *                      format: int64
 *                  eightRepMax:
 *                      type: integer
 *                      format: int64
 *                  tenRepMax:
 *                      type: integer
 *                      format: int64
 *                  twelveRepMax:
 *                      type: integer
 *                      format: int64
 * 
 *          UserOnExcerciseDelete:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: integer
 *                      format: int64
 *                  excerciseId:    
 *                      type: integer
 *                      format: int64
 * 
 *          Error:
 *              type: object
 *              properties:
 *                  status:
 *                      type: integer
 *                  errorMessage:
 *                      type: string
 */

import express, { Request, Response } from "express";
import { UserOnExcerciseInput, UserOnExcerciseDelete, UserOnExcerciseUpdateInput } from "../types";
import userOnExcerciseService from "../service/userOnExcercise.service";

const userOnExcerciseRouter = express.Router();

/**
 * @swagger
 * /userOnExcercise/add:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Add a new userOnExcercise
 *      tags: [UserOnExcercise]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserOnExcerciseInput'
 *      responses:
 *          200:
 *              description: The userOnExcercise was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserOnExcercise'
 *          400:
 *              description: The request was malformed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error' 
 */
userOnExcerciseRouter.post("/add", async (req: Request, res: Response) => {
    try {
        const userOnExcerciseInput = <UserOnExcerciseInput>req.body;
        const userOnExcercise = await userOnExcerciseService.addUserOnExcercise(userOnExcerciseInput);
        res.status(200).json(userOnExcercise);
    } 
    catch (error: any) {
        console.error(error);
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /userOnExcercise/delete:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a userOnExcercise
 *      tags: [UserOnExcercise]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserOnExcerciseDelete'
 *      responses:
 *          200:
 *              description: The userOnExcercise was successfully deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserOnExcercise'
 *          400:
 *              description: The request was malformed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */ 
userOnExcerciseRouter.delete("/delete", async (req: Request, res: Response) => {
    try {
        const userOnExcerciseDelete = <UserOnExcerciseDelete>req.body;
        const userOnExcercise = await userOnExcerciseService.deleteUserOnExcercise(userOnExcerciseDelete);
        res.status(200).json(userOnExcercise);
    } 
    catch (error: any) {
        console.error(error);
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /userOnExcercise:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a userOnExcercise
 *      tags: [UserOnExcercise]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserOnExcerciseUpdateInput'
 *      responses:
 *          200:
 *              description: The userOnExcercise was successfully updated.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserOnExcercise'
 *          400:
 *              description: The request was malformed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'     
 */
userOnExcerciseRouter.put("/", async (req: Request, res: Response) => {
    try {
        const userOnExcerciseUpdateInput = <UserOnExcerciseUpdateInput>req.body;
        const userOnExcercise = await userOnExcerciseService.updateUserOnExcercise(userOnExcerciseUpdateInput);
        res.status(200).json(userOnExcercise);
    } 
    catch (error: any) {
        console.error(error);
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});

/**
 * @swagger
 * /userOnExcercise/withIds:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a userOnExcercise by userId and excerciseId
 *      tags: [UserOnExcercise]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserOnExcerciseDelete'
 *      responses:
 *          200:
 *              description: The userOnExcercise was successfully retrieved.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserOnExcercise'
 *          400:
 *              description: The request was malformed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userOnExcerciseRouter.post("/withIds", async (req: Request, res: Response) => {
    try {
        const userOnExcerciseDelete = <UserOnExcerciseDelete>req.body;
        const userOnExcercise = await userOnExcerciseService.getUserOnExcercise(userOnExcerciseDelete);
        res.status(200).json(userOnExcercise);
    } 
    catch (error: any) {
        console.error(error);
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});

export default userOnExcerciseRouter;