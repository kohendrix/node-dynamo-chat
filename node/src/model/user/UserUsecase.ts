import { log, logE, logD } from '../../commons/util/logger';
import { UserType, User } from './User';
import { generateTokenSync, generateToken } from '../../commons/util/tokenGenerator';
import {
  IUserRepository,
  UserBundle,
  UserCallback,
  SimpleCallback,
  UserBundleCallback,
} from './interfaces/IUserRepository';
const p = logD(__filename);

/**
 * User related usecases
 * This module should be called by request handlers
 */
export class UserUsecase {
  public repository: IUserRepository;

  /**
   * Dependency Injection.
   * @param repo
   */
  constructor(repo: IUserRepository) {
    this.repository = repo;
  }

  /*************/
  /* UNIVERSAL */
  /*************/

  /**
   * This will not check password even if it's a basic user.
   * Call this only when the session login status is valid.
   * @param type
   * @param uuid
   * @returns
   */
  async getUserSync(type: UserType, uuid: string): Promise<User | undefined> {
    return await this.repository.findSync(type, uuid);
  }

  /**
   * This will not check password even if it's a basic user.
   * Call this only when the session login status is valid.
   * @param type
   * @param uuid
   * @param cb
   * @returns
   */
  getUser(type: UserType, uuid: string, cb: UserCallback): void {
    this.repository.find(type, uuid, cb);
    return;
  }

  /**
   * Replace the old data object with the new data.
   * Thus, the new data must be the complete data.
   * Throws error on fail.
   * @param user
   * @param newData
   * @returns
   */
  async updateDataSync(user: User, newData: object): Promise<undefined> {
    const updatedUser = new User(user.type, user.uuid, newData, user.created, new Date());
    return await this.repository.updateDataSync(updatedUser);
  }

  /**
   * Replace the old data object with the new data.
   * Thus, the new data must be the complete data.
   * @param user
   * @param newData
   * @returns
   */
  updateData(user: User, newData: object, cb: SimpleCallback): void {
    const updatedUser = new User(user.type, user.uuid, newData, user.created, new Date());
    this.repository.updateData(updatedUser, cb);
    return;
  }

  /**
   * Delete a user from the db.
   * Throws error on fail.
   * @param user
   * @returns
   */
  async deleteUserSync(user: User): Promise<undefined> {
    return await this.repository.deleteSync(user);
  }

  /**
   * Delete a user from the db.
   * @param user
   * @param cb
   * @returns
   */
  deleteUser(user: User, cb: SimpleCallback): void {
    this.repository.delete(user, cb);
    return;
  }

  /***************/
  /* SOCIAL USER */
  /***************/
  /**
   * Register a social user.
   * @param type
   * @param uuid
   * @param data
   * @returns
   */
  async socialRegisterSync(type: UserType, uuid: string, data: object): Promise<User | undefined> {
    if (type === UserType.Basic) throw Error('Invalid Argument. call basicRegister instead');
    const user = new User(type, uuid, data, new Date());
    await this.repository.addSync(user);
    return user;
  }

  /**
   * Register a social user.
   * @param type
   * @param uuid
   * @param data
   * @param cb
   * @returns
   */
  socialRegister(type: UserType, uuid: string, data: object, cb: UserCallback): void {
    try {
      if (type === UserType.Basic) throw new Error('Invalid Argument. call basicRegister instead');
      const user = new User(type, uuid, data, new Date());

      this.repository.add(user, err => cb(err, user));
    } catch (error) {
      cb(error);
    }

    return;
  }

  /******************/
  /* BASIC TMP USER */
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
  async basicTmpRegisterSync(email: string, password: string, data: object = {}): Promise<string> {
    const registrationToken = await generateTokenSync();
    const user = new User(UserType.Basic, email, { email, ...data }, new Date());

    await this.repository.addBasicTmpSync(user, password, registrationToken);
    return registrationToken;
  }

  /**
   * This is temporary registration.
   * These parameters won't be checked here, so make sure to validate/sanitize before calling.
   * @param email
   * @param password
   * @param cb
   * @param data
   * @returns A generated registration token.
   */
  basicTmpRegister(email: string, password: string, cb: StringCallback, data: object = {}): void {
    generateToken((e, registrationToken) => {
      try {
        if (e) throw e;
        const user = new User(UserType.Basic, email, { email, ...data }, new Date());

        this.repository.addBasicTmp(user, password, registrationToken, err => {
          err ? cb(err) : cb(undefined, registrationToken);
        });
      } catch (err) {
        cb(err);
      }
    });
    return;
  }

  /**
   * Get a tmp user.
   * Even if s/he does not exist, the returning object scheme won't change.
   * @param registrationToken
   * @returns
   */
  async getBasicTmpUserSync(registrationToken: string): Promise<UserBundle | undefined> {
    return await this.repository.findBasicTmpSync(registrationToken);
  }

  /**
   * Get a tmp user.
   * Even if s/he does not exist, the returning object scheme won't change.
   * @param registrationToken
   * @param cb
   * @returns
   */
  getBasicTmpUser(registrationToken: string, cb: UserBundleCallback): void {
    this.repository.findBasicTmp(registrationToken, cb);
    return;
  }

  /**************/
  /* BASIC USER */
  /**************/

  /**
   * Get a basic user with password.
   * For login process.
   * @param email
   * @param password
   * @returns
   */
  async getBasicUserWithPasswordSync(email: string, password: string): Promise<User | undefined> {
    return await this.repository.findWithPasswordSync(email, password);
  }

  /**
   * Get a basic user with password.
   * For login process.
   * @param email
   * @param password
   * @param cb
   * @returns
   */
  getBasicUserWithPassword(email: string, password: string, cb: UserCallback): void {
    this.repository.findWithPassword(email, password, cb);
    return;
  }

  /**
   * Register a basic user.
   * This is the actual registration of basic users.
   * make sure the password is hashed (retrieved from the tmp basic table).
   * Throws error on fail.
   * @param user
   * @param password The hashed one.
   * @returns
   */
  async basicRegisterSync(user: User, password: string): Promise<User> {
    await this.repository.addSync(user, password);

    return user;
  }

  /**
   * Register a basic user.
   * This is the actual registration of basic users.
   * make sure the password is hashed (retrieved from the tmp basic table).
   * @param user
   * @param password The hashed one.
   * @param cb
   * @returns
   */
  basicRegister(user: User, password: string, cb: UserCallback): void {
    this.repository.add(
      user,
      err => {
        err ? cb(err) : cb(undefined, user);
      },
      password,
    );

    return;
  }
}

export type StringCallback = (err?: Error, str?: string) => void;
