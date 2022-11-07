import { Wallet } from "../domain/wallet";

export interface RepositoryType {
    getWallet: (walletId: string) => Promise<Wallet | null>;
    addWallet: (wallet: Wallet, id?: string) => Promise<Wallet>;
}

export const fromDataBaseToWallet = (dbWallet: {
    id?: number;
    wallet_id: string;
    transaction_id: string;
    version: number;
    coins: number;
}): Wallet => {
    return {
        id: dbWallet.id,
        walletId: dbWallet.wallet_id,
        transactionId: dbWallet.transaction_id,
        version: dbWallet.version,
        coins: dbWallet.coins,
    };
};
