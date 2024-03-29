export enum Command {
    BALANCE,
    CREDIT,
    DEBIT,
}

export type DataBaseConfigParams = {
    host: string;
    user: string;
    password: string;
    db: string;
    dialect: string;
    port: number;
};
