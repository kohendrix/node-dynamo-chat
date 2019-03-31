#!/usr/bin/env node
/// <reference types="debug" />
/// <reference types="express" />
declare module "commons/util/logger" {
    /**
     * Common log module with debug.
     * On default, debug module will send logs to stderr.
     * Using log() here will send them to stdout.
     * ref => https://www.npmjs.com/package/debug
     */
    import debug from 'debug';
    const log: debug.Debugger;
    const logE: debug.Debugger;
    const logD: Function;
    export { log, logE, logD };
}
declare module "interfaces/ExpressError" {
    export interface ExpressError {
        syscall?: string;
        code?: string;
        message?: string;
        status?: number;
    }
}
declare module "app" {
    const app: import("express-serve-static-core").Express;
    export { app };
}
declare module "interfaces/ConfigSchema" {
    export type ConfigSchema = {
        mysql: {
            master: {
                connectionLimit: number;
                host: string;
                user: string;
                password: string;
                database: string;
                port: number;
                ssl: false;
                connectTimeout: number;
            };
        };
        server: {
            baseUri: string;
            port: number;
            key: string;
            cert: string;
        };
        redis: {
            host: string;
            port: number;
        };
        aws: {
            sslEnabled: boolean;
            accessKeyId: string;
            secretAccessKey: string;
            region: string;
            endpoint: string;
            dax: {
                endpoints: [];
            };
        };
    };
}
declare module "bin/www" { }
declare module "drivers/dynamo/DynamoClient" {
    import { DocumentClient, PutItemInput, PutItemOutput, GetItemInput, QueryInput, ScanInput, DeleteItemInput, DeleteItemOutput, ItemList, UpdateItemInput, UpdateItemOutput } from 'aws-sdk/clients/dynamodb';
    /**
     * DynamoDB access client.
     * Using DocumentClient.
     */
    class DynamoClient {
        db: DocumentClient;
        /**
         * @param config aws config
         */
        constructor(config: {
            [key: string]: any;
        }, dax?: {
            endpoints: Array<string>;
            region: string;
        });
        /**
         * Put a single object.
         * @param params
         * @returns
         */
        putItemSync(params: PutItemInput): Promise<PutItemOutput>;
        /**
         * Put a single object.
         * @param params
         * @param cb
         * @returns
         */
        putItem(params: PutItemInput, cb: (err?: DynamoError, result?: PutItemOutput) => void): void;
        /**
         * Update a single object.
         * @param params
         * @returns
         */
        updateItemSync(params: UpdateItemInput): Promise<UpdateItemOutput>;
        /**
         * Update a single object.
         * @param params
         * @param cb
         * @returns
         */
        updateItem(params: UpdateItemInput, cb: (err?: DynamoError, result?: PutItemOutput) => void): void;
        /**
         * Get by the key.
         * @param params
         * @returns
         */
        getItemSync(params: GetItemInput): Promise<object | undefined>;
        /**
         * Get by the key.
         * @param params
         * @param cb
         * @returns
         */
        getItem(params: GetItemInput, cb: (err?: DynamoError, result?: object) => void): void;
        /**
         * Run query.
         * @param params
         * @returns
         */
        queryTableSync(params: QueryInput): Promise<ItemList | undefined>;
        /**
         * Run query.
         * @param params
         * @param
         * @returns
         */
        queryTable(params: QueryInput, cb: (err?: DynamoError, result?: object) => void): void;
        /**
         * Run scan.
         * @param params
         * @returns
         */
        scanTableSync(params: ScanInput): Promise<ItemList | undefined>;
        /**
         * Run scan.
         * @param params
         * @param
         * @returns
         */
        scanTable(params: ScanInput, cb: (err?: DynamoError, result?: object) => void): void;
        /**
         * Delete a single object.
         * @param params
         * @returns
         */
        deleteItemSync(params: DeleteItemInput): Promise<DeleteItemOutput>;
        /**
         * Delete a single object.
         * @param params
         * @param cb
         * @returns
         */
        deleteItem(params: DeleteItemInput, cb: (err?: DynamoError, result?: DeleteItemOutput) => void): void;
    }
    /**
     * Module error class.
     */
    class DynamoError extends Error {
        statusCode: number;
        /**
         * @param error_object
         */
        constructor(error_object: Error);
    }
    export { DynamoClient, DynamoError };
}
declare module "drivers/dynamo/dynamoClientProvider" {
    import { DynamoClient } from "drivers/dynamo/DynamoClient";
    /**
     * Provider of DynamoClient.
     * @param instance
     */
    export function getDynamoClient(): DynamoClient;
}
declare module "middleware/requestHandlers/login" {
    import express from 'express';
    export class Login {
        constructor();
        postSync: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    }
}
declare module "middleware/requestHandlers/signup" {
    import express from 'express';
    export class Signup {
        constructor();
        getSync: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
        postSync: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    }
}
declare module "middleware/requestHandlers/index" {
    import { Login } from "middleware/requestHandlers/login";
    import { Signup } from "middleware/requestHandlers/signup";
    const login: Login, signup: Signup;
    export { login, signup };
}
declare module "middleware/requestHandlers/top" {
    import express from 'express';
    export class Top {
        constructor();
        getSync: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    }
}
declare module "routes/index" { }
declare module "routes/user" { }
