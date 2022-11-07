import { WalletResponse } from "../routes/types";
import { Wallet } from "./wallet";
import { Constants } from "../routes/constants";
import { RepositoryType } from "../repositories/types";
import {
    DuplicateTransactionError,
    InsuficientFundsError,
    WalletNotFoundError,
} from "./errors";

export const balanceCommand = async (
    walletId: string,
    walletRepository: RepositoryType
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (wallet) {
        return { status: Constants.HTTP_OK, wallet: wallet };
    } else {
        throw new WalletNotFoundError();
    }
};

export const creditCommand = async (
    walletId: string,
    transactionId: string,
    coins: number,
    walletRepository: RepositoryType
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (wallet) {
        if (transactionId === wallet.transactionId) {
            throw new DuplicateTransactionError(wallet.coins);
        }

        const newWallet: Wallet = {
            ...wallet,
            walletId: walletId,
            transactionId: transactionId,
            version: wallet.version + 1,
            coins: wallet.coins + coins,
        };

        await walletRepository.addWallet(newWallet);

        return { status: Constants.HTTP_CREATED, wallet: newWallet };
    } else {
        const newWallet = {
            walletId: walletId,
            transactionId: transactionId,
            version: 1,
            coins: coins,
        };

        await walletRepository.addWallet(newWallet);

        return {
            status: Constants.HTTP_CREATED,
            wallet: newWallet,
        };
    }
};

export const debitCommand = async (
    walletId: string,
    transactionId: string,
    coins: number,
    walletRepository: RepositoryType
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (!wallet) {
        throw new WalletNotFoundError();
    }

    if (transactionId === wallet.transactionId) {
        throw new DuplicateTransactionError(wallet.coins);
    }

    if (coins > wallet.coins) {
        throw new InsuficientFundsError();
    }

    const newWallet: Wallet = {
        ...wallet,
        transactionId: transactionId,
        version: wallet.version + 1,
        coins: wallet.coins - coins,
    };

    await walletRepository.addWallet(newWallet);
    return { status: Constants.HTTP_CREATED, wallet: newWallet };
};
