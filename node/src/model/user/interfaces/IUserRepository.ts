import { User, UserType } from '../User';

export type UserBundle = { user: User; password: string };
export type SimpleCallback = (err?: Error) => void;
// make sure to pass undefined to the first arg when you pass User.
export type UserCallback = (err?: Error, user?: User) => void;
// make sure to pass undefined to the first arg when you pass UserBundle.
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
