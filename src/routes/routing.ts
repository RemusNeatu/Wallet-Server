import * as handlers from "./handlers";
import { RepositoryType } from "../repositories/types";

export const addRouting = (app: any, walletRepository: RepositoryType) => {
    app.get("/wallets/*", handlers.getBalanceRequestHandler(walletRepository));

    app.post(
        "/wallets/*/credit",
        handlers.postCreditRequestHandler(walletRepository)
    );

    app.post(
        "/wallets/*/debit",
        handlers.postDebitRequestHandler(walletRepository)
    );

    app.all("*", handlers.notFoundRequestHandler);
};
