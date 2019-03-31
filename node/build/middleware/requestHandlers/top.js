"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Top = void 0;

var _logger = require("../../commons/util/logger");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const p = (0, _logger.logD)(__filename);

class Top {
  constructor() {
    _defineProperty(this, "getSync", async (req, res, next) => {
      res.render('index');
      return;
    });
  }

}

exports.Top = Top;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL3JlcXVlc3RIYW5kbGVycy90b3AudHMiXSwibmFtZXMiOlsicCIsIl9fZmlsZW5hbWUiLCJUb3AiLCJjb25zdHJ1Y3RvciIsInJlcSIsInJlcyIsIm5leHQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBLE1BQU1BLENBQUMsR0FBRyxrQkFBS0MsVUFBTCxDQUFWOztBQUVPLE1BQU1DLEdBQU4sQ0FBVTtBQUNmQyxFQUFBQSxXQUFXLEdBQUc7QUFBQSxxQ0FFSixPQUFPQyxHQUFQLEVBQTZCQyxHQUE3QixFQUFvREMsSUFBcEQsS0FBa0c7QUFDMUdELE1BQUFBLEdBQUcsQ0FBQ0UsTUFBSixDQUFXLE9BQVg7QUFDQTtBQUNELEtBTGE7QUFBRTs7QUFERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgbG9nLCBsb2dFLCBsb2dEIH0gZnJvbSAnLi4vLi4vY29tbW9ucy91dGlsL2xvZ2dlcic7XG5jb25zdCBwID0gbG9nRChfX2ZpbGVuYW1lKTtcblxuZXhwb3J0IGNsYXNzIFRvcCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXRTeW5jID0gYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcmVzLnJlbmRlcignaW5kZXgnKTtcbiAgICByZXR1cm47XG4gIH07XG59XG4iXX0=