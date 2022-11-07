import { Constants } from "../routes/constants";
import { HttpResponse, WalletResponse } from "../routes/types";

export const fromWalletResponsetoHttpResponse = (
    walletResponse: WalletResponse
): HttpResponse => {
    return {
        status: walletResponse.status,

        payload:
            walletResponse.status == Constants.HTTP_OK
                ? {
                      transactionId: walletResponse.wallet?.transactionId,
                      version: walletResponse.wallet?.version,
                      coins: walletResponse.wallet?.coins,
                  }
                : undefined,
        message:
            walletResponse.status == Constants.HTTP_OK
                ? walletResponse.wallet?.coins.toString()
                : undefined,
    };
};
