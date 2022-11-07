import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { WalletError } from "../domain/errors";

export const errorHandler: ErrorRequestHandler = (
    error: WalletError,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(error.status).send(error.message);
    next();
};
