"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserType = exports.User = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * User Entity class
 */
class User {
  /**
   * @param type Basic, Google etc.
   * @param uuid For basic users this will be their email, for social users it's the uuid issued by the media.
   * @param data This is the actual data exposed to clients. if the data passed is undefined, initializes with an empty object.
   * @param created The date the account was created.
   * @param updated The last updated date.
   */
  constructor(type, uuid, data = {}, created, updated) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "uuid", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "created", void 0);

    _defineProperty(this, "updated", void 0);

    this.type = type;
    this.uuid = uuid;
    this.data = data;
    this.created = created;
    this.updated = updated;
  }
  /**
   * for response
   * @returns A User data, the schema is not defined.
   */


  serialize() {
    return this.data;
  }

}
/**
 * user type would be basic (email, password) or social media types such as Google.
 */


exports.User = User;
let UserType;
exports.UserType = UserType;

(function (UserType) {
  UserType[UserType["Basic"] = 0] = "Basic";
  UserType[UserType["Google"] = 1] = "Google";
})(UserType || (exports.UserType = UserType = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC91c2VyL1VzZXIudHMiXSwibmFtZXMiOlsiVXNlciIsImNvbnN0cnVjdG9yIiwidHlwZSIsInV1aWQiLCJkYXRhIiwiY3JlYXRlZCIsInVwZGF0ZWQiLCJzZXJpYWxpemUiLCJVc2VyVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7OztBQUdPLE1BQU1BLElBQU4sQ0FBVztBQU9oQjs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBaUJDLElBQWpCLEVBQStCQyxJQUFZLEdBQUcsRUFBOUMsRUFBa0RDLE9BQWxELEVBQWlFQyxPQUFqRSxFQUFpRjtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxRixTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDtBQUVEOzs7Ozs7QUFJT0MsRUFBQUEsU0FBUCxHQUEyQjtBQUN6QixXQUFPLEtBQUtILElBQVo7QUFDRDs7QUE1QmU7QUErQmxCOzs7Ozs7SUFHWUksUTs7O1dBQUFBLFE7QUFBQUEsRUFBQUEsUSxDQUFBQSxRO0FBQUFBLEVBQUFBLFEsQ0FBQUEsUTtHQUFBQSxRLHdCQUFBQSxRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2VyIEVudGl0eSBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIHB1YmxpYyB0eXBlOiBVc2VyVHlwZTtcbiAgcHVibGljIHV1aWQ6IHN0cmluZztcbiAgcHVibGljIGRhdGE6IG9iamVjdDtcbiAgcHVibGljIGNyZWF0ZWQ6IERhdGU7XG4gIHB1YmxpYyB1cGRhdGVkPzogRGF0ZTtcblxuICAvKipcbiAgICogQHBhcmFtIHR5cGUgQmFzaWMsIEdvb2dsZSBldGMuXG4gICAqIEBwYXJhbSB1dWlkIEZvciBiYXNpYyB1c2VycyB0aGlzIHdpbGwgYmUgdGhlaXIgZW1haWwsIGZvciBzb2NpYWwgdXNlcnMgaXQncyB0aGUgdXVpZCBpc3N1ZWQgYnkgdGhlIG1lZGlhLlxuICAgKiBAcGFyYW0gZGF0YSBUaGlzIGlzIHRoZSBhY3R1YWwgZGF0YSBleHBvc2VkIHRvIGNsaWVudHMuIGlmIHRoZSBkYXRhIHBhc3NlZCBpcyB1bmRlZmluZWQsIGluaXRpYWxpemVzIHdpdGggYW4gZW1wdHkgb2JqZWN0LlxuICAgKiBAcGFyYW0gY3JlYXRlZCBUaGUgZGF0ZSB0aGUgYWNjb3VudCB3YXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHVwZGF0ZWQgVGhlIGxhc3QgdXBkYXRlZCBkYXRlLlxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZTogVXNlclR5cGUsIHV1aWQ6IHN0cmluZywgZGF0YTogb2JqZWN0ID0ge30sIGNyZWF0ZWQ6IERhdGUsIHVwZGF0ZWQ/OiBEYXRlKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnV1aWQgPSB1dWlkO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5jcmVhdGVkID0gY3JlYXRlZDtcbiAgICB0aGlzLnVwZGF0ZWQgPSB1cGRhdGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIGZvciByZXNwb25zZVxuICAgKiBAcmV0dXJucyBBIFVzZXIgZGF0YSwgdGhlIHNjaGVtYSBpcyBub3QgZGVmaW5lZC5cbiAgICovXG4gIHB1YmxpYyBzZXJpYWxpemUoKTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cbi8qKlxuICogdXNlciB0eXBlIHdvdWxkIGJlIGJhc2ljIChlbWFpbCwgcGFzc3dvcmQpIG9yIHNvY2lhbCBtZWRpYSB0eXBlcyBzdWNoIGFzIEdvb2dsZS5cbiAqL1xuZXhwb3J0IGVudW0gVXNlclR5cGUge1xuICBCYXNpYyA9IDAsXG4gIEdvb2dsZSA9IDEsXG59XG4iXX0=