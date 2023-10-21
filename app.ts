import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import userRouter from './controller/user.routes';
import habitRouter from './controller/habit.routes';
import todoRouter from './controller/todo.routes';
import deadlineRouter from './controller/deadline.routes';
import excerciseRouter from './controller/excercise.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 8000;
const jwtSecret = process.env.JWT_SECRET;

app.use(cors({ origin: "http://localhost:8000"}));
app.use(bodyParser.json());
// app.use(
//     expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
//         path: [/^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
//     })
// );

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Back-end',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOpts);

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/habits", habitRouter);
app.use("/deadlines", deadlineRouter);
app.use("/excercises", excerciseRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});