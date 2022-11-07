import { Pool } from "pg";
import { Wallet } from "../domain/wallet";
import { fromDataBaseToWallet, RepositoryType } from "./types";

export const PostgresRepository = (pool: Pool): RepositoryType => {
    return {
        getWallet: async (walletId: string): Promise<Wallet | null> => {
            const result = await pool.query(
                `SELECT * FROM WALLETS
                WHERE wallet_id = $1
                ORDER BY version DESC`,
                [walletId]
            );

            return result.rowCount > 0
                ? fromDataBaseToWallet(result.rows[0])
                : null;
        },

        addWallet: async (wallet: Wallet): Promise<Wallet> => {
            const result = await pool.query(
                `INSERT INTO WALLETS
                (wallet_id, coins, version, transaction_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
                [
                    wallet.walletId,
                    wallet.coins,
                    wallet.version,
                    wallet.transactionId,
                ]
            );

            return result.rows[0];
        },
    };
};
