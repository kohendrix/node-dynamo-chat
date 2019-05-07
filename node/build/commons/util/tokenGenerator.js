"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.generateTokenSync = generateTokenSync;

var _crypto = _interopRequireDefault(require("crypto"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _logger = require("../util/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p = (0, _logger.logD)(__filename);
/**
 * Generate random token.
 * If performance is required, use [[generateToken]]
 * @param param
 * @param cb
 * @returns
 */

function generateToken(cb, {
  stringBase = 'hex',
  byteLength = 48
} = {}) {
  try {
    _crypto.default.randomBytes(byteLength, (err, buffer) => {
      try {
        if (err) throw err;
        cb(err, buffer.toString(stringBase));
      } catch (error) {
        cb(error, '');
      }
    });
  } catch (error) {
    cb(error, '');
  }
}
/**
 * Generate random token.
 * If performance is required, use [[generateToken]]
 * @param param
 * @returns
 */


function generateTokenSync({
  stringBase = 'hex',
  byteLength = 48
} = {}) {
  return new _bluebird.default((res, rej) => {
    _crypto.default.randomBytes(byteLength, (err, buffer) => {
      try {
        return err ? rej(err) : res(buffer.toString(stringBase));
      } catch (error) {
        return rej(error);
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb25zL3V0aWwvdG9rZW5HZW5lcmF0b3IudHMiXSwibmFtZXMiOlsicCIsIl9fZmlsZW5hbWUiLCJnZW5lcmF0ZVRva2VuIiwiY2IiLCJzdHJpbmdCYXNlIiwiYnl0ZUxlbmd0aCIsImNyeXB0byIsInJhbmRvbUJ5dGVzIiwiZXJyIiwiYnVmZmVyIiwidG9TdHJpbmciLCJlcnJvciIsImdlbmVyYXRlVG9rZW5TeW5jIiwiQmx1ZWJpcmQiLCJyZXMiLCJyZWoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNQSxDQUFDLEdBQUcsa0JBQUtDLFVBQUwsQ0FBVjtBQUVBOzs7Ozs7OztBQU9PLFNBQVNDLGFBQVQsQ0FDTEMsRUFESyxFQUVMO0FBQUVDLEVBQUFBLFVBQVUsR0FBRyxLQUFmO0FBQXNCQyxFQUFBQSxVQUFVLEdBQUc7QUFBbkMsSUFBMEMsRUFGckMsRUFHQztBQUNOLE1BQUk7QUFDRkMsb0JBQU9DLFdBQVAsQ0FBbUJGLFVBQW5CLEVBQStCLENBQUNHLEdBQUQsRUFBTUMsTUFBTixLQUFpQjtBQUM5QyxVQUFJO0FBQ0YsWUFBSUQsR0FBSixFQUFTLE1BQU1BLEdBQU47QUFFVEwsUUFBQUEsRUFBRSxDQUFDSyxHQUFELEVBQU1DLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQk4sVUFBaEIsQ0FBTixDQUFGO0FBQ0QsT0FKRCxDQUlFLE9BQU9PLEtBQVAsRUFBYztBQUNkUixRQUFBQSxFQUFFLENBQUNRLEtBQUQsRUFBUSxFQUFSLENBQUY7QUFDRDtBQUNGLEtBUkQ7QUFTRCxHQVZELENBVUUsT0FBT0EsS0FBUCxFQUFjO0FBQ2RSLElBQUFBLEVBQUUsQ0FBQ1EsS0FBRCxFQUFRLEVBQVIsQ0FBRjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7QUFNTyxTQUFTQyxpQkFBVCxDQUEyQjtBQUFFUixFQUFBQSxVQUFVLEdBQUcsS0FBZjtBQUFzQkMsRUFBQUEsVUFBVSxHQUFHO0FBQW5DLElBQTBDLEVBQXJFLEVBQTJGO0FBQ2hHLFNBQU8sSUFBSVEsaUJBQUosQ0FBYSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUNoQ1Qsb0JBQU9DLFdBQVAsQ0FBbUJGLFVBQW5CLEVBQStCLENBQUNHLEdBQUQsRUFBTUMsTUFBTixLQUFpQjtBQUM5QyxVQUFJO0FBQ0YsZUFBT0QsR0FBRyxHQUFHTyxHQUFHLENBQUNQLEdBQUQsQ0FBTixHQUFjTSxHQUFHLENBQUNMLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQk4sVUFBaEIsQ0FBRCxDQUEzQjtBQUNELE9BRkQsQ0FFRSxPQUFPTyxLQUFQLEVBQWM7QUFDZCxlQUFPSSxHQUFHLENBQUNKLEtBQUQsQ0FBVjtBQUNEO0FBQ0YsS0FORDtBQU9ELEdBUk0sQ0FBUDtBQVNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGxvZ0QgfSBmcm9tICcuLi91dGlsL2xvZ2dlcic7XG5jb25zdCBwID0gbG9nRChfX2ZpbGVuYW1lKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSByYW5kb20gdG9rZW4uXG4gKiBJZiBwZXJmb3JtYW5jZSBpcyByZXF1aXJlZCwgdXNlIFtbZ2VuZXJhdGVUb2tlbl1dXG4gKiBAcGFyYW0gcGFyYW1cbiAqIEBwYXJhbSBjYlxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVG9rZW4oXG4gIGNiOiAoZXJyOiBFcnJvciB8IG51bGwsIHRva2VuOiBzdHJpbmcpID0+IHZvaWQsXG4gIHsgc3RyaW5nQmFzZSA9ICdoZXgnLCBieXRlTGVuZ3RoID0gNDggfSA9IHt9LFxuKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgY3J5cHRvLnJhbmRvbUJ5dGVzKGJ5dGVMZW5ndGgsIChlcnIsIGJ1ZmZlcikgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgIGNiKGVyciwgYnVmZmVyLnRvU3RyaW5nKHN0cmluZ0Jhc2UpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNiKGVycm9yLCAnJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY2IoZXJyb3IsICcnKTtcbiAgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIHJhbmRvbSB0b2tlbi5cbiAqIElmIHBlcmZvcm1hbmNlIGlzIHJlcXVpcmVkLCB1c2UgW1tnZW5lcmF0ZVRva2VuXV1cbiAqIEBwYXJhbSBwYXJhbVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVG9rZW5TeW5jKHsgc3RyaW5nQmFzZSA9ICdoZXgnLCBieXRlTGVuZ3RoID0gNDggfSA9IHt9KTogQmx1ZWJpcmQ8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgQmx1ZWJpcmQoKHJlcywgcmVqKSA9PiB7XG4gICAgY3J5cHRvLnJhbmRvbUJ5dGVzKGJ5dGVMZW5ndGgsIChlcnIsIGJ1ZmZlcikgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGVyciA/IHJlaihlcnIpIDogcmVzKGJ1ZmZlci50b1N0cmluZyhzdHJpbmdCYXNlKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVqKGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=