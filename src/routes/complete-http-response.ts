import { Response } from "express";
import { HttpResponse, WalletResponse } from "./types";
import { fromWalletResponsetoHttpResponse } from "../utils/http-response-builder";

export const completeHttpResponse = (
    walletResponse: WalletResponse,
    response: Response
) => {
    const httpResponse: HttpResponse =
        fromWalletResponsetoHttpResponse(walletResponse);

    response.status(httpResponse.status);

    if (httpResponse.payload) {
        response.json(httpResponse.payload);
    } else {
        response.send(httpResponse.message);
    }
};
