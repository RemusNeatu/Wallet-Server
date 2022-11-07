import { NextFunction, Request, Response } from "express";
import {
    balanceCommand,
    creditCommand,
    debitCommand,
} from "../domain/commands";

import { WalletResponse } from "./types";
import { Constants } from "./constants";
import { RepositoryType } from "../repositories/types";
import { completeHttpResponse } from "./complete-http-response";

export const getBalanceRequestHandler = (walletRepository: RepositoryType) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const walletId = request.params["0"];
            const walletResponse: WalletResponse = await balanceCommand(
                walletId,
                walletRepository
            );

            completeHttpResponse(walletResponse, response);
        } catch (error) {
            next(error);
        }
    };
};

export const postCreditRequestHandler = (walletRepository: RepositoryType) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const walletId = request.params["0"];
            const transactionId: string = request.body.transactionId;
            const coins: number = request.body.coins;

            const walletResponse: WalletResponse = await creditCommand(
                walletId,
                transactionId,
                coins,
                walletRepository
            );

            completeHttpResponse(walletResponse, response);
        } catch (error) {
            next(error);
        }
    };
};

export const postDebitRequestHandler = (walletRepository: RepositoryType) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const walletId = request.params["0"];
            const transactionId: string = request.body.transactionId;
            const coins: number = request.body.coins;

            const walletResponse: WalletResponse = await debitCommand(
                walletId,
                transactionId,
                coins,
                walletRepository
            );

            completeHttpResponse(walletResponse, response);
        } catch (error) {
            next(error);
        }
    };
};

export const notFoundRequestHandler = (
    request: Request,
    response: Response
) => {
    response.status(Constants.HTTP_NOT_FOUND).send("Resource not found");
};
