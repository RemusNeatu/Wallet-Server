import { Wallet } from "../domain/wallet";

// Repo used for testing

export class DataBase {
    db: Map<string, Wallet>;

    constructor() {
        this.db = new Map<string, Wallet>();
    }

    addEntry = (id: string, wallet: Wallet): Promise<Wallet> => {
        this.db.set(id, wallet);

        return Promise.resolve(wallet);
    };

    getEntry = (id: string): Promise<Wallet | null> => {
        const walletResponse = this.db.get(id);
        const wallet = walletResponse ? walletResponse! : null;

        return Promise.resolve(wallet);
    };
}
