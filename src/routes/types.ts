import { Wallet } from "../domain/wallet";

export type WalletResponse = {
    status: number;
    wallet?: Wallet;
};

export type HttpResponse = {
    status: number;
    payload?: object;
    message?: string;
};
