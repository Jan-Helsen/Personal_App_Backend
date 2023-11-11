/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the user.
 *                  firstName:
 *                      type: string
 *                      description: First Name of the user.
 *                  lastName:
 *                      type: string
 *                      description: Last Name of the user.
 *                  email:
 *                      type: string
 *                      description: Email of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the user.
 *                  todos:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Todo'
 *                  habits:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Habit'
 *                  deadlines:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Deadline'
 *          Users:
 *              type: array
 *              items:
 *                  $ref: '#components/schemas/User'
 *          UserInput:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: First Name of the user.
 *                  lastName:
 *                      type: string
 *                      description: Last Name of the user.
 *                  email:
 *                      type: string
 *                      description: Email of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the user.
 *                  todosIds: 
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each todo.
 *                  habitsIds:
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each habit.
 *                  deadlinesIds:
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each deadline.
 *          UserUpdate:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the user.
 *                  firstName:
 *                      type: string
 *                      description: First Name of the user.
 *                  lastName:
 *                      type: string
 *                      description: Last Name of the user.
 *                  email:
 *                      type: string
 *                      description: Email of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the user.
 *                  todosIds: 
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each todo.
 *                  habitsIds:
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each habit.
 *                  deadlinesIds:
 *                      type: array
 *                      items:
 *                          type: number
 *                          description: Id from each deadline.
 *          UserDelete:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Id of the user.
 *          UserEmail:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Email of the user.
 *          UserLogin:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Email of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the user.
 *          LoginReturn:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: Message of succes.
 *          FriendInput:
 *              type: object
 *              properties:
 *                  userIdA:
 *                      type: number
 *                      description: Id of user A.
 *                  userIdB:
 *                      type: number
 *                      description: Id of user B.
 *          Error:
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
import userService from "../service/user.service";
import { UserInput, UserUpdateInput, UserDelete, UserEmail, UserLogin, FriendsInput } from "../types";

const userRouter = express.Router();
/**
 * @swagger
 * /users:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Returns all users, if there are no users, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({ status: "error", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a user by ID
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Returns a user. If the user does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Returns an error
 *              constent:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID
 *          required: true
 *          schema:
 *              type: integer
 *              format: int64
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById({ id: req.params.id });
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message});    
    }
});
/**
 * @swagger
 * /users/getUserByEmail:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a user by email.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserEmail'
 *      responses:
 *          200:
 *              description: Returns a user. If the user does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Returns an error
 *              constent:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.post('/getUserByEmail', async (req: Request, res: Response) => {
    try {
        const UserEmail = <UserEmail>req.body;
        const user = await userService.getUserByEmail(UserEmail)
        res.status(200).json(user);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", errorMessage: error.message });    
    }
});
/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Login as a user.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *      responses:
 *          200:
 *              description: message and jwt-token.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginReturn'
 *          500:
 *              description: Error message from login.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const userInput = <UserLogin>req.body;
        const token = await userService.authenticate(userInput);
        res.status(200).json({ message: "Authentication succesful", token });    
    } 
    catch (error) {
        res.status(401).json({ status: "unauthorized", errorMessage: error.message });
    }
});
/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Add a user.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: The created user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.post("/signup", async (req: Request, res: Response) => {
    const userInput = <UserInput>req.body;
    try {
        const user = await userService.createUser(userInput);
        res.status(200).json(user);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /users:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a user.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserUpdateInput'
 *      responses:
 *          200:
 *              description: The updated user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.put("/", async (req: Request, res: Response) => {
    const userInput = <UserUpdateInput>req.body;
    try {
        const user = await userService.updateUser(userInput);
        res.status(200).json(user);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /users:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a user.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserDelete'
 *      responses:
 *          200:
 *              description: User that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.delete("/", async (req: Request, res: Response) => {
    const userInput = <UserDelete>req.body;
    try {
        const user = await userService.deleteUserWithId(userInput);
        res.status(200).json(user);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /users/addFriend:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Add a Friend.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FriendInput'
 *      responses:
 *          200:
 *              description: User that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.post("/addFriend", async (req: Request, res: Response) => {
    const friendsInput = <FriendsInput>req.body;
    try {
        const users = await userService.addFriendship(friendsInput);
        res.status(200).json(users);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})
/**
 * @swagger
 * /users/removeFriend:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Remove a Friend.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FriendInput'
 *      responses:
 *          200:
 *              description: User that was deleted.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          500:
 *              description: Returns an error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 */
userRouter.post("/removeFriend", async (req: Request, res: Response) => {
    const friendsInput = <FriendsInput>req.body;
    try {
        const users = await userService.removeFriendship(friendsInput);
        res.status(200).json(users);    
    } 
    catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})
export default userRouter;