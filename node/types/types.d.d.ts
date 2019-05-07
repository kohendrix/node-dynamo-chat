#!/usr/bin/env node
/// <reference types="debug" />
/// <reference types="express" />
/// <reference types="express-serve-static-core" />
/// <reference types="express-session" />
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
declare module "commons/util/tokenGenerator" {
    import Bluebird from 'bluebird';
    /**
     * Generate random token.
     * If performance is required, use [[generateToken]]
     * @param param
     * @param cb
     * @returns
     */
    export function generateToken(cb: (err: Error | null, token: string) => void, { stringBase, byteLength }?: {
        stringBase?: string;
        byteLength?: number;
    }): void;
    /**
     * Generate random token.
     * If performance is required, use [[generateToken]]
     * @param param
     * @returns
     */
    export function generateTokenSync({ stringBase, byteLength }?: {
        stringBase?: string;
        byteLength?: number;
    }): Bluebird<string>;
}
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
declare module "model/interfaces/IUsecase" {
    export interface IUsecase {
    }
}
declare module "model/user/User" {
    /**
     * User Entity class
     */
    export class User {
        type: UserType;
        uuid: string;
        data: object;
        created: Date;
        updated?: Date;
        /**
         * @param type Basic, Google etc.
         * @param uuid For basic users this will be their email, for social users it's the uuid issued by the media.
         * @param data This is the actual data exposed to clients. if the data passed is undefined, initializes with an empty object.
         * @param created The date the account was created.
         * @param updated The last updated date.
         */
        constructor(type: UserType, uuid: string, data: object, created: Date, updated?: Date);
        /**
         * for response
         * @returns A User data, the schema is not defined.
         */
        serialize(): object;
    }
    /**
     * user type would be basic (email, password) or social media types such as Google.
     */
    export enum UserType {
        Basic = 0,
        Google = 1
    }
}
declare module "model/session/sessionClient" {
    import { UserType } from "model/user/User";
    /**
     * Store login info into the session.
     * @param req
     * @param type
     * @param uuid
     * @returns
     */
    function storeSession(req: Express.Request, type: UserType, uuid: string): void;
    /**
     * Reset the session.
     * @param req
     * @param cb
     * @returns
     */
    function destroySession(req: Express.Request, cb: (err?: Error) => void): void;
    /**
     * Reset the session.
     * @param req
     * @returns
     */
    function destroySessionSync(req: Express.Request): Promise<void>;
    export { storeSession, destroySession, destroySessionSync };
}
declare module "model/session/sessionEvaluator" {
    /**
     * For now, just checking the uuid, but maybe add some params to check later.
     * If the session login status is valid, returns true.
     * @param session
     * @return
     */
    export function evaluateSession(session: Express.Session): boolean;
}
declare module "model/user/interfaces/IUserRepository" {
    import { User, UserType } from "model/user/User";
    export type UserBundle = {
        user: User;
        password: string;
    };
    export type SimpleCallback = (err?: Error) => void;
    export type UserCallback = (err?: Error, user?: User) => void;
    export type UserBundleCallback = (err?: Error, bundle?: UserBundle) => void;
    /**
     * Abstraction layer for database swap and such.
     */
    export interface IUserRepository {
        /*************/
        /**** GET ****/
        /*************/
        /**
         * \[GET\] :
         * Find a tmp user by registration token.
         * @param registrationToken The token issed on a tmp registration.
         * @returns Object which holds a User and password.
         */
        findBasicTmpSync(registrationToken: string): Promise<UserBundle | undefined>;
        /**
         * \[GET\] :
         * Find a tmp user by registration token.
         * @param registrationToken The token issed on a tmp registration.
         * @param cb
         * @returns
         */
        findBasicTmp(registrationToken: string, cb: UserBundleCallback): void;
        /**
         * \[GET\] :
         * Find a user by UserType and uuid.
         * Can be used regardless of UserType.
         * For password validation, use [[findWithPasswordSync]] or [[findWithPassword]]
         * @param type
         * @param uuid
         * @returns
         */
        findSync(type: UserType, uuid: string): Promise<User | undefined>;
        /**
         * \[GET\] :
         * Find a user by UserType and uuid.
         * Can be used regardless of UserType.
         * For password validation, use [[findWithPasswordSync]] or [[findWithPassword]]
         * @param type
         * @param uuid
         * @param cb
         * @returns
         */
        find(type: UserType, uuid: string, cb: UserCallback): void;
        /**
         * \[GET\] :
         * UserType.Basic only.
         * @param uuid
         * @param password This must not be hashed.
         * @returns
         */
        findWithPasswordSync(uuid: string, password: string): Promise<User | undefined>;
        /**
         * \[GET\] :
         * UserType.Basic only
         * @param uuid
         * @param password This must not be hashed.
         * @param cb
         * @returns
         */
        findWithPassword(uuid: string, password: string, cb: UserCallback): void;
        /**************/
        /**** POST ****/
        /**************/
        /**
         * \[POST\] :
         * Register a tmp basic user.
         * Throws error on fail.
         * @param user
         * @param password
         * @param registrationToken
         * @returns
         */
        addBasicTmpSync(user: User, password: string, registrationToken: string): Promise<undefined>;
        /**
         * \[POST\] :
         * Register a tmp basic user.
         * @param user
         * @param password
         * @param registrationToken
         * @param cb
         * @returns
         */
        addBasicTmp(user: User, password: string, registrationToken: string, cb: SimpleCallback): void;
        /**
         * \[POST\] :
         * This can be used for all user types.
         * Throws error on fail.
         * @param user
         * @param password
         * @returns
         */
        addSync(user: User, password?: string): Promise<undefined>;
        /**
         * \[POST\] :
         * This can be used for all user types.
         * @param user
         * @param password
         * @param cb
         * @returns
         */
        add(user: User, cb: SimpleCallback, password?: string): void;
        /*************/
        /**** PUT ****/
        /*************/
        /**
         * \[PUT\] :
         * This is only for updates so if the uuid passed does not exist, throws an error.
         * Throws error on fail.
         * @param user
         * @returns
         */
        updateDataSync(user: User): Promise<undefined>;
        /**
         * \[PUT\] :
         * This is only for updates so if the uuid passed does not exist, throws an error.
         * @param user
         * @param cb
         * @returns
         */
        updateData(user: User, cb: SimpleCallback): void;
        /****************/
        /**** DELETE ****/
        /****************/
        /**
         * \[DELETE\] :
         * This is PHYSICAL delete.
         * Delete a user by uuid.
         * Throws error on fail.
         * @param user
         * @returns
         */
        deleteSync(user: User): Promise<undefined>;
        /**
         * \[DELETE\] :
         * This is PHYSICAL delete.
         * Delete a user by uuid
         * @param user
         * @param cb
         * @returns
         */
        delete(user: User, cb: SimpleCallback): void;
    }
}
declare module "model/user/UserUsecase" {
    import { UserType, User } from "model/user/User";
    import { IUserRepository, UserBundle, UserCallback, SimpleCallback, UserBundleCallback } from "model/user/interfaces/IUserRepository";
    /**
     * User related usecases
     * This module should be called by request handlers
     */
    export class UserUsecase {
        repository: IUserRepository;
        /**
         * Dependency Injection.
         * @param repo
         */
        constructor(repo: IUserRepository);
        /*************/
        /*************/
        /**
         * This will not check password even if it's a basic user.
         * Call this only when the session login status is valid.
         * @param type
         * @param uuid
         * @returns
         */
        getUserSync(type: UserType, uuid: string): Promise<User | undefined>;
        /**
         * This will not check password even if it's a basic user.
         * Call this only when the session login status is valid.
         * @param type
         * @param uuid
         * @param cb
         * @returns
         */
        getUser(type: UserType, uuid: string, cb: UserCallback): void;
        /**
         * Replace the old data object with the new data.
         * Thus, the new data must be the complete data.
         * Throws error on fail.
         * @param user
         * @param newData
         * @returns
         */
        updateDataSync(user: User, newData: object): Promise<undefined>;
        /**
         * Replace the old data object with the new data.
         * Thus, the new data must be the complete data.
         * @param user
         * @param newData
         * @returns
         */
        updateData(user: User, newData: object, cb: SimpleCallback): void;
        /**
         * Delete a user from the db.
         * Throws error on fail.
         * @param user
         * @returns
         */
        deleteUserSync(user: User): Promise<undefined>;
        /**
         * Delete a user from the db.
         * @param user
         * @param cb
         * @returns
         */
        deleteUser(user: User, cb: SimpleCallback): void;
        /***************/
        /***************/
        /**
         * Register a social user.
         * @param type
         * @param uuid
         * @param data
         * @returns
         */
        socialRegisterSync(type: UserType, uuid: string, data: object): Promise<User | undefined>;
        /**
         * Register a social user.
         * @param type
         * @param uuid
         * @param data
         * @param cb
         * @returns
         */
        socialRegister(type: UserType, uuid: string, data: object, cb: UserCallback): void;
        /******************/
        /******************/
        /**
         * This is temporary registration.
         * These parameters won't be checked here, so make sure to validate/sanitize before calling.
         * Throws error on fail.
         * @param email
         * @param password
         * @param data
         * @returns A generated registration token.
         */
        basicTmpRegisterSync(email: string, password: string, data?: object): Promise<string>;
        /**
         * This is temporary registration.
         * These parameters won't be checked here, so make sure to validate/sanitize before calling.
         * @param email
         * @param password
         * @param cb
         * @param data
         * @returns A generated registration token.
         */
        basicTmpRegister(email: string, password: string, cb: StringCallback, data?: object): void;
        /**
         * Get a tmp user.
         * Even if s/he does not exist, the returning object scheme won't change.
         * @param registrationToken
         * @returns
         */
        getBasicTmpUserSync(registrationToken: string): Promise<UserBundle | undefined>;
        /**
         * Get a tmp user.
         * Even if s/he does not exist, the returning object scheme won't change.
         * @param registrationToken
         * @param cb
         * @returns
         */
        getBasicTmpUser(registrationToken: string, cb: UserBundleCallback): void;
        /**************/
        /**************/
        /**
         * Get a basic user with password.
         * For login process.
         * @param email
         * @param password
         * @returns
         */
        getBasicUserWithPasswordSync(email: string, password: string): Promise<User | undefined>;
        /**
         * Get a basic user with password.
         * For login process.
         * @param email
         * @param password
         * @param cb
         * @returns
         */
        getBasicUserWithPassword(email: string, password: string, cb: UserCallback): void;
        /**
         * Register a basic user.
         * This is the actual registration of basic users.
         * make sure the password is hashed (retrieved from the tmp basic table).
         * Throws error on fail.
         * @param user
         * @param password The hashed one.
         * @returns
         */
        basicRegisterSync(user: User, password: string): Promise<User>;
        /**
         * Register a basic user.
         * This is the actual registration of basic users.
         * make sure the password is hashed (retrieved from the tmp basic table).
         * @param user
         * @param password The hashed one.
         * @param cb
         * @returns
         */
        basicRegister(user: User, password: string, cb: UserCallback): void;
    }
    export type StringCallback = (err?: Error, str?: string) => void;
}
declare module "model/user/interfaces/UserItem" {
    /**
     * DB response to model translater.
     */
    export interface UserItem {
        uuid: string;
        data: object;
        created: string;
        updated?: string;
    }
    /**
     * Basic users have password which is not null.
     */
    export interface BasicUserItem extends UserItem {
        password: string;
    }
    /**
     * Typeguard for UserItem.
     * @param obj
     */
    export const isUserItem: (obj: object) => obj is UserItem;
    /**
     * Typeguard for BasicUserItem.
     * @param obj
     */
    export const isBasicUserItem: (obj: object) => obj is BasicUserItem;
}
declare module "routes/chatroom" { }
declare module "routes/index" { }
declare module "routes/user" { }
