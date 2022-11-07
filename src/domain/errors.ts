import { Constants } from "../routes/constants";

export interface WalletError extends Error {
    name: string;
    status: number;
}

export class WalletNotFoundError implements WalletError {
    message = "";
    name = "Wallet not found.";
    status = Constants.HTTP_NOT_FOUND;
}

export class InsuficientFundsError implements WalletError {
    message = "";
    name = "Insuficient funds for debit.";
    status = Constants.HTTP_BAD_REQUEST;
}

export class DuplicateTransactionError implements WalletError {
    message = "";
    name = "Same transaction requested 2 times.";
    status = Constants.HTTP_ACCEPTED;

    constructor(balance: number) {
        this.message = balance.toString();
    }
}

export class ServerError implements WalletError {
    message = "";
    name = "Server error";
    status = Constants.HTTP_NOT_FOUND;
}
