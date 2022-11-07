import { NextFunction, Request, Response } from "express";

export const logger = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    console.log(request.method + " " + request.url + " : " + date);

    next();
};
