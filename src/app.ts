import express, { Application, Request, Response } from "express";
import { notFound } from "./app/middleware/notFound";
import { IndexRoutes } from "./app/routes";

const app: Application = express();


app.use(express.json());


app.use("/api/v1", IndexRoutes);

// Basic route
app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    })
});


app.use(notFound)

export default app;