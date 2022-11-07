import { NextFunction, Request, Response } from "express";
import { requestValidator } from "./validator";

const validRequestSchema = {
    type: "object",
    required: ["transactionId", "coins"],
    properties: {
        transactionId: {
            type: "string",
        },
        coins: {
            type: "integer",
            minimum: 0,
        },
    },
};

export const authorize = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (request.method === "POST") {
        const auth: boolean = requestValidator(
            validRequestSchema,
            request.body
        );

        if (!auth) {
            return response.status(400).send("Bad request body.");
        }
    }

    next();
};
