"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserUsecase = void 0;

var _logger = require("../../commons/util/logger");

var _User = require("./User");

var _tokenGenerator = require("../../commons/util/tokenGenerator");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const p = (0, _logger.logD)(__filename);
/**
 * User related usecases
 * This module should be called by request handlers
 */

class UserUsecase {
  /**
   * Dependency Injection.
   * @param repo
   */
  constructor(repo) {
    _defineProperty(this, "repository", void 0);

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


  async getUserSync(type, uuid) {
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


  getUser(type, uuid, cb) {
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


  async updateDataSync(user, newData) {
    const updatedUser = new _User.User(user.type, user.uuid, newData, user.created, new Date());
    return await this.repository.updateDataSync(updatedUser);
  }
  /**
   * Replace the old data object with the new data.
   * Thus, the new data must be the complete data.
   * @param user
   * @param newData
   * @returns
   */


  updateData(user, newData, cb) {
    const updatedUser = new _User.User(user.type, user.uuid, newData, user.created, new Date());
    this.repository.updateData(updatedUser, cb);
    return;
  }
  /**
   * Delete a user from the db.
   * Throws error on fail.
   * @param user
   * @returns
   */


  async deleteUserSync(user) {
    return await this.repository.deleteSync(user);
  }
  /**
   * Delete a user from the db.
   * @param user
   * @param cb
   * @returns
   */


  deleteUser(user, cb) {
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


  async socialRegisterSync(type, uuid, data) {
    if (type === _User.UserType.Basic) throw Error('Invalid Argument. call basicRegister instead');
    const user = new _User.User(type, uuid, data, new Date());
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


  socialRegister(type, uuid, data, cb) {
    try {
      if (type === _User.UserType.Basic) throw new Error('Invalid Argument. call basicRegister instead');
      const user = new _User.User(type, uuid, data, new Date());
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


  async basicTmpRegisterSync(email, password, data = {}) {
    const registrationToken = await (0, _tokenGenerator.generateTokenSync)();
    const user = new _User.User(_User.UserType.Basic, email, _objectSpread({
      email
    }, data), new Date());
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


  basicTmpRegister(email, password, cb, data = {}) {
    (0, _tokenGenerator.generateToken)((e, registrationToken) => {
      try {
        if (e) throw e;
        const user = new _User.User(_User.UserType.Basic, email, _objectSpread({
          email
        }, data), new Date());
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


  async getBasicTmpUserSync(registrationToken) {
    return await this.repository.findBasicTmpSync(registrationToken);
  }
  /**
   * Get a tmp user.
   * Even if s/he does not exist, the returning object scheme won't change.
   * @param registrationToken
   * @param cb
   * @returns
   */


  getBasicTmpUser(registrationToken, cb) {
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


  async getBasicUserWithPasswordSync(email, password) {
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


  getBasicUserWithPassword(email, password, cb) {
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


  async basicRegisterSync(user, password) {
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


  basicRegister(user, password, cb) {
    this.repository.add(user, err => {
      err ? cb(err) : cb(undefined, user);
    }, password);
    return;
  }

}

exports.UserUsecase = UserUsecase;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC91c2VyL1VzZXJVc2VjYXNlLnRzIl0sIm5hbWVzIjpbInAiLCJfX2ZpbGVuYW1lIiwiVXNlclVzZWNhc2UiLCJjb25zdHJ1Y3RvciIsInJlcG8iLCJyZXBvc2l0b3J5IiwiZ2V0VXNlclN5bmMiLCJ0eXBlIiwidXVpZCIsImZpbmRTeW5jIiwiZ2V0VXNlciIsImNiIiwiZmluZCIsInVwZGF0ZURhdGFTeW5jIiwidXNlciIsIm5ld0RhdGEiLCJ1cGRhdGVkVXNlciIsIlVzZXIiLCJjcmVhdGVkIiwiRGF0ZSIsInVwZGF0ZURhdGEiLCJkZWxldGVVc2VyU3luYyIsImRlbGV0ZVN5bmMiLCJkZWxldGVVc2VyIiwiZGVsZXRlIiwic29jaWFsUmVnaXN0ZXJTeW5jIiwiZGF0YSIsIlVzZXJUeXBlIiwiQmFzaWMiLCJFcnJvciIsImFkZFN5bmMiLCJzb2NpYWxSZWdpc3RlciIsImFkZCIsImVyciIsImVycm9yIiwiYmFzaWNUbXBSZWdpc3RlclN5bmMiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVnaXN0cmF0aW9uVG9rZW4iLCJhZGRCYXNpY1RtcFN5bmMiLCJiYXNpY1RtcFJlZ2lzdGVyIiwiZSIsImFkZEJhc2ljVG1wIiwidW5kZWZpbmVkIiwiZ2V0QmFzaWNUbXBVc2VyU3luYyIsImZpbmRCYXNpY1RtcFN5bmMiLCJnZXRCYXNpY1RtcFVzZXIiLCJmaW5kQmFzaWNUbXAiLCJnZXRCYXNpY1VzZXJXaXRoUGFzc3dvcmRTeW5jIiwiZmluZFdpdGhQYXNzd29yZFN5bmMiLCJnZXRCYXNpY1VzZXJXaXRoUGFzc3dvcmQiLCJmaW5kV2l0aFBhc3N3b3JkIiwiYmFzaWNSZWdpc3RlclN5bmMiLCJiYXNpY1JlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQVFBLE1BQU1BLENBQUMsR0FBRyxrQkFBS0MsVUFBTCxDQUFWO0FBRUE7Ozs7O0FBSU8sTUFBTUMsV0FBTixDQUFrQjtBQUd2Qjs7OztB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QThCdUIsUUFBOUIsQ0FBTjtBQUVBLFdBQU92QixJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFTQXVDLEVBQUFBLGFBQWEsQ0FBQ3ZDLElBQUQsRUFBYXVCLFFBQWIsRUFBK0IxQixFQUEvQixFQUF1RDtBQUNsRSxTQUFLTixVQUFMLENBQWdCMkIsR0FBaEIsQ0FDRWxCLElBREYsRUFFRW1CLEdBQUcsSUFBSTtBQUNMQSxNQUFBQSxHQUFHLEdBQUd0QixFQUFFLENBQUNzQixHQUFELENBQUwsR0FBYXRCLEVBQUUsQ0FBQ2dDLFNBQUQsRUFBWTdCLElBQVosQ0FBbEI7QUFDRCxLQUpILEVBS0V1QixRQUxGO0FBUUE7QUFDRDs7QUE5UHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9nLCBsb2dFLCBsb2dEIH0gZnJvbSAnLi4vLi4vY29tbW9ucy91dGlsL2xvZ2dlcic7XG5pbXBvcnQgeyBVc2VyVHlwZSwgVXNlciB9IGZyb20gJy4vVXNlcic7XG5pbXBvcnQgeyBnZW5lcmF0ZVRva2VuU3luYywgZ2VuZXJhdGVUb2tlbiB9IGZyb20gJy4uLy4uL2NvbW1vbnMvdXRpbC90b2tlbkdlbmVyYXRvcic7XG5pbXBvcnQge1xuICBJVXNlclJlcG9zaXRvcnksXG4gIFVzZXJCdW5kbGUsXG4gIFVzZXJDYWxsYmFjayxcbiAgU2ltcGxlQ2FsbGJhY2ssXG4gIFVzZXJCdW5kbGVDYWxsYmFjayxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0lVc2VyUmVwb3NpdG9yeSc7XG5jb25zdCBwID0gbG9nRChfX2ZpbGVuYW1lKTtcblxuLyoqXG4gKiBVc2VyIHJlbGF0ZWQgdXNlY2FzZXNcbiAqIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBjYWxsZWQgYnkgcmVxdWVzdCBoYW5kbGVyc1xuICovXG5leHBvcnQgY2xhc3MgVXNlclVzZWNhc2Uge1xuICBwdWJsaWMgcmVwb3NpdG9yeTogSVVzZXJSZXBvc2l0b3J5O1xuXG4gIC8qKlxuICAgKiBEZXBlbmRlbmN5IEluamVjdGlvbi5cbiAgICogQHBhcmFtIHJlcG9cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlcG86IElVc2VyUmVwb3NpdG9yeSkge1xuICAgIHRoaXMucmVwb3NpdG9yeSA9IHJlcG87XG4gIH1cblxuICAvKioqKioqKioqKioqKi9cbiAgLyogVU5JVkVSU0FMICovXG4gIC8qKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgbm90IGNoZWNrIHBhc3N3b3JkIGV2ZW4gaWYgaXQncyBhIGJhc2ljIHVzZXIuXG4gICAqIENhbGwgdGhpcyBvbmx5IHdoZW4gdGhlIHNlc3Npb24gbG9naW4gc3RhdHVzIGlzIHZhbGlkLlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gdXVpZFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgYXN5bmMgZ2V0VXNlclN5bmModHlwZTogVXNlclR5cGUsIHV1aWQ6IHN0cmluZyk6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuZmluZFN5bmModHlwZSwgdXVpZCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyB3aWxsIG5vdCBjaGVjayBwYXNzd29yZCBldmVuIGlmIGl0J3MgYSBiYXNpYyB1c2VyLlxuICAgKiBDYWxsIHRoaXMgb25seSB3aGVuIHRoZSBzZXNzaW9uIGxvZ2luIHN0YXR1cyBpcyB2YWxpZC5cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIHV1aWRcbiAgICogQHBhcmFtIGNiXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBnZXRVc2VyKHR5cGU6IFVzZXJUeXBlLCB1dWlkOiBzdHJpbmcsIGNiOiBVc2VyQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLnJlcG9zaXRvcnkuZmluZCh0eXBlLCB1dWlkLCBjYik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGhlIG9sZCBkYXRhIG9iamVjdCB3aXRoIHRoZSBuZXcgZGF0YS5cbiAgICogVGh1cywgdGhlIG5ldyBkYXRhIG11c3QgYmUgdGhlIGNvbXBsZXRlIGRhdGEuXG4gICAqIFRocm93cyBlcnJvciBvbiBmYWlsLlxuICAgKiBAcGFyYW0gdXNlclxuICAgKiBAcGFyYW0gbmV3RGF0YVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgYXN5bmMgdXBkYXRlRGF0YVN5bmModXNlcjogVXNlciwgbmV3RGF0YTogb2JqZWN0KTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB1cGRhdGVkVXNlciA9IG5ldyBVc2VyKHVzZXIudHlwZSwgdXNlci51dWlkLCBuZXdEYXRhLCB1c2VyLmNyZWF0ZWQsIG5ldyBEYXRlKCkpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcG9zaXRvcnkudXBkYXRlRGF0YVN5bmModXBkYXRlZFVzZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGhlIG9sZCBkYXRhIG9iamVjdCB3aXRoIHRoZSBuZXcgZGF0YS5cbiAgICogVGh1cywgdGhlIG5ldyBkYXRhIG11c3QgYmUgdGhlIGNvbXBsZXRlIGRhdGEuXG4gICAqIEBwYXJhbSB1c2VyXG4gICAqIEBwYXJhbSBuZXdEYXRhXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICB1cGRhdGVEYXRhKHVzZXI6IFVzZXIsIG5ld0RhdGE6IG9iamVjdCwgY2I6IFNpbXBsZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3QgdXBkYXRlZFVzZXIgPSBuZXcgVXNlcih1c2VyLnR5cGUsIHVzZXIudXVpZCwgbmV3RGF0YSwgdXNlci5jcmVhdGVkLCBuZXcgRGF0ZSgpKTtcbiAgICB0aGlzLnJlcG9zaXRvcnkudXBkYXRlRGF0YSh1cGRhdGVkVXNlciwgY2IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB1c2VyIGZyb20gdGhlIGRiLlxuICAgKiBUaHJvd3MgZXJyb3Igb24gZmFpbC5cbiAgICogQHBhcmFtIHVzZXJcbiAgICogQHJldHVybnNcbiAgICovXG4gIGFzeW5jIGRlbGV0ZVVzZXJTeW5jKHVzZXI6IFVzZXIpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuZGVsZXRlU3luYyh1c2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB1c2VyIGZyb20gdGhlIGRiLlxuICAgKiBAcGFyYW0gdXNlclxuICAgKiBAcGFyYW0gY2JcbiAgICogQHJldHVybnNcbiAgICovXG4gIGRlbGV0ZVVzZXIodXNlcjogVXNlciwgY2I6IFNpbXBsZUNhbGxiYWNrKTogdm9pZCB7XG4gICAgdGhpcy5yZXBvc2l0b3J5LmRlbGV0ZSh1c2VyLCBjYik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqKioqKioqKioqKioqKi9cbiAgLyogU09DSUFMIFVTRVIgKi9cbiAgLyoqKioqKioqKioqKioqKi9cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgc29jaWFsIHVzZXIuXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSB1dWlkXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBhc3luYyBzb2NpYWxSZWdpc3RlclN5bmModHlwZTogVXNlclR5cGUsIHV1aWQ6IHN0cmluZywgZGF0YTogb2JqZWN0KTogUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKHR5cGUgPT09IFVzZXJUeXBlLkJhc2ljKSB0aHJvdyBFcnJvcignSW52YWxpZCBBcmd1bWVudC4gY2FsbCBiYXNpY1JlZ2lzdGVyIGluc3RlYWQnKTtcbiAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodHlwZSwgdXVpZCwgZGF0YSwgbmV3IERhdGUoKSk7XG4gICAgYXdhaXQgdGhpcy5yZXBvc2l0b3J5LmFkZFN5bmModXNlcik7XG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBzb2NpYWwgdXNlci5cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIHV1aWRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGNiXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzb2NpYWxSZWdpc3Rlcih0eXBlOiBVc2VyVHlwZSwgdXVpZDogc3RyaW5nLCBkYXRhOiBvYmplY3QsIGNiOiBVc2VyQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGUgPT09IFVzZXJUeXBlLkJhc2ljKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQXJndW1lbnQuIGNhbGwgYmFzaWNSZWdpc3RlciBpbnN0ZWFkJyk7XG4gICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodHlwZSwgdXVpZCwgZGF0YSwgbmV3IERhdGUoKSk7XG5cbiAgICAgIHRoaXMucmVwb3NpdG9yeS5hZGQodXNlciwgZXJyID0+IGNiKGVyciwgdXNlcikpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYihlcnJvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKi9cbiAgLyogQkFTSUMgVE1QIFVTRVIgKi9cbiAgLyoqKioqKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICogVGhpcyBpcyB0ZW1wb3JhcnkgcmVnaXN0cmF0aW9uLlxuICAgKiBUaGVzZSBwYXJhbWV0ZXJzIHdvbid0IGJlIGNoZWNrZWQgaGVyZSwgc28gbWFrZSBzdXJlIHRvIHZhbGlkYXRlL3Nhbml0aXplIGJlZm9yZSBjYWxsaW5nLlxuICAgKiBUaHJvd3MgZXJyb3Igb24gZmFpbC5cbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyBBIGdlbmVyYXRlZCByZWdpc3RyYXRpb24gdG9rZW4uXG4gICAqL1xuICBhc3luYyBiYXNpY1RtcFJlZ2lzdGVyU3luYyhlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkYXRhOiBvYmplY3QgPSB7fSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcmVnaXN0cmF0aW9uVG9rZW4gPSBhd2FpdCBnZW5lcmF0ZVRva2VuU3luYygpO1xuICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcihVc2VyVHlwZS5CYXNpYywgZW1haWwsIHsgZW1haWwsIC4uLmRhdGEgfSwgbmV3IERhdGUoKSk7XG5cbiAgICBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuYWRkQmFzaWNUbXBTeW5jKHVzZXIsIHBhc3N3b3JkLCByZWdpc3RyYXRpb25Ub2tlbik7XG4gICAgcmV0dXJuIHJlZ2lzdHJhdGlvblRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGVtcG9yYXJ5IHJlZ2lzdHJhdGlvbi5cbiAgICogVGhlc2UgcGFyYW1ldGVycyB3b24ndCBiZSBjaGVja2VkIGhlcmUsIHNvIG1ha2Ugc3VyZSB0byB2YWxpZGF0ZS9zYW5pdGl6ZSBiZWZvcmUgY2FsbGluZy5cbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKiBAcGFyYW0gY2JcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybnMgQSBnZW5lcmF0ZWQgcmVnaXN0cmF0aW9uIHRva2VuLlxuICAgKi9cbiAgYmFzaWNUbXBSZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBjYjogU3RyaW5nQ2FsbGJhY2ssIGRhdGE6IG9iamVjdCA9IHt9KTogdm9pZCB7XG4gICAgZ2VuZXJhdGVUb2tlbigoZSwgcmVnaXN0cmF0aW9uVG9rZW4pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChlKSB0aHJvdyBlO1xuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIoVXNlclR5cGUuQmFzaWMsIGVtYWlsLCB7IGVtYWlsLCAuLi5kYXRhIH0sIG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIHRoaXMucmVwb3NpdG9yeS5hZGRCYXNpY1RtcCh1c2VyLCBwYXNzd29yZCwgcmVnaXN0cmF0aW9uVG9rZW4sIGVyciA9PiB7XG4gICAgICAgICAgZXJyID8gY2IoZXJyKSA6IGNiKHVuZGVmaW5lZCwgcmVnaXN0cmF0aW9uVG9rZW4pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0bXAgdXNlci5cbiAgICogRXZlbiBpZiBzL2hlIGRvZXMgbm90IGV4aXN0LCB0aGUgcmV0dXJuaW5nIG9iamVjdCBzY2hlbWUgd29uJ3QgY2hhbmdlLlxuICAgKiBAcGFyYW0gcmVnaXN0cmF0aW9uVG9rZW5cbiAgICogQHJldHVybnNcbiAgICovXG4gIGFzeW5jIGdldEJhc2ljVG1wVXNlclN5bmMocmVnaXN0cmF0aW9uVG9rZW46IHN0cmluZyk6IFByb21pc2U8VXNlckJ1bmRsZSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuZmluZEJhc2ljVG1wU3luYyhyZWdpc3RyYXRpb25Ub2tlbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdG1wIHVzZXIuXG4gICAqIEV2ZW4gaWYgcy9oZSBkb2VzIG5vdCBleGlzdCwgdGhlIHJldHVybmluZyBvYmplY3Qgc2NoZW1lIHdvbid0IGNoYW5nZS5cbiAgICogQHBhcmFtIHJlZ2lzdHJhdGlvblRva2VuXG4gICAqIEBwYXJhbSBjYlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZ2V0QmFzaWNUbXBVc2VyKHJlZ2lzdHJhdGlvblRva2VuOiBzdHJpbmcsIGNiOiBVc2VyQnVuZGxlQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLnJlcG9zaXRvcnkuZmluZEJhc2ljVG1wKHJlZ2lzdHJhdGlvblRva2VuLCBjYik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqKioqKioqKioqKioqL1xuICAvKiBCQVNJQyBVU0VSICovXG4gIC8qKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICogR2V0IGEgYmFzaWMgdXNlciB3aXRoIHBhc3N3b3JkLlxuICAgKiBGb3IgbG9naW4gcHJvY2Vzcy5cbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgYXN5bmMgZ2V0QmFzaWNVc2VyV2l0aFBhc3N3b3JkU3luYyhlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucmVwb3NpdG9yeS5maW5kV2l0aFBhc3N3b3JkU3luYyhlbWFpbCwgcGFzc3dvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGJhc2ljIHVzZXIgd2l0aCBwYXNzd29yZC5cbiAgICogRm9yIGxvZ2luIHByb2Nlc3MuXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICogQHBhcmFtIGNiXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBnZXRCYXNpY1VzZXJXaXRoUGFzc3dvcmQoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgY2I6IFVzZXJDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMucmVwb3NpdG9yeS5maW5kV2l0aFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCwgY2IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGJhc2ljIHVzZXIuXG4gICAqIFRoaXMgaXMgdGhlIGFjdHVhbCByZWdpc3RyYXRpb24gb2YgYmFzaWMgdXNlcnMuXG4gICAqIG1ha2Ugc3VyZSB0aGUgcGFzc3dvcmQgaXMgaGFzaGVkIChyZXRyaWV2ZWQgZnJvbSB0aGUgdG1wIGJhc2ljIHRhYmxlKS5cbiAgICogVGhyb3dzIGVycm9yIG9uIGZhaWwuXG4gICAqIEBwYXJhbSB1c2VyXG4gICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgaGFzaGVkIG9uZS5cbiAgICogQHJldHVybnNcbiAgICovXG4gIGFzeW5jIGJhc2ljUmVnaXN0ZXJTeW5jKHVzZXI6IFVzZXIsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBhd2FpdCB0aGlzLnJlcG9zaXRvcnkuYWRkU3luYyh1c2VyLCBwYXNzd29yZCk7XG5cbiAgICByZXR1cm4gdXNlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGJhc2ljIHVzZXIuXG4gICAqIFRoaXMgaXMgdGhlIGFjdHVhbCByZWdpc3RyYXRpb24gb2YgYmFzaWMgdXNlcnMuXG4gICAqIG1ha2Ugc3VyZSB0aGUgcGFzc3dvcmQgaXMgaGFzaGVkIChyZXRyaWV2ZWQgZnJvbSB0aGUgdG1wIGJhc2ljIHRhYmxlKS5cbiAgICogQHBhcmFtIHVzZXJcbiAgICogQHBhcmFtIHBhc3N3b3JkIFRoZSBoYXNoZWQgb25lLlxuICAgKiBAcGFyYW0gY2JcbiAgICogQHJldHVybnNcbiAgICovXG4gIGJhc2ljUmVnaXN0ZXIodXNlcjogVXNlciwgcGFzc3dvcmQ6IHN0cmluZywgY2I6IFVzZXJDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMucmVwb3NpdG9yeS5hZGQoXG4gICAgICB1c2VyLFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgZXJyID8gY2IoZXJyKSA6IGNiKHVuZGVmaW5lZCwgdXNlcik7XG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQsXG4gICAgKTtcblxuICAgIHJldHVybjtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdHJpbmdDYWxsYmFjayA9IChlcnI/OiBFcnJvciwgc3RyPzogc3RyaW5nKSA9PiB2b2lkO1xuIl19