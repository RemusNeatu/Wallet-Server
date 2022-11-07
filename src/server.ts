import { PostgresRepository } from "./repositories/postgres-repository";
import { createDbPool } from "./config/db-config";
import { addRouting } from "./routes/routing";
import { authorize } from "./middleware/authorize";
import { logger } from "./middleware/logger";
import * as dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/error-handle";

export const createServer = () => {
    dotenv.config();
    const app = express();

    const dbPool = createDbPool();
    const walletRepository = PostgresRepository(dbPool);

    app.use(express.json());

    app.use(logger);
    app.use(authorize);

    addRouting(app, walletRepository);

    app.use(errorHandler);

    app.listen(8080, () => {
        console.log("Server is runnnig on 8080...");
    });
};
