import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 8000;

app.use(cors({ origin: "http://localhost:8000"}));
app.use(bodyParser.json());

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

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});