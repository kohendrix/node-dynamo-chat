"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @route /
 */
const router = _express.default.Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index');
});
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaW5kZXgudHMiXSwibmFtZXMiOlsicm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsImdldCIsInJlcSIsInJlcyIsIm5leHQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUdBOzs7O0FBSEE7OztBQUlBLE1BQU1BLE1BQU0sR0FBR0MsaUJBQVFDLE1BQVIsRUFBZjtBQUVBOzs7QUFDQUYsTUFBTSxDQUFDRyxHQUFQLENBQVcsR0FBWCxFQUFnQixVQUFTQyxHQUFULEVBQStCQyxHQUEvQixFQUFzREMsSUFBdEQsRUFBa0Y7QUFDaEdELEVBQUFBLEdBQUcsQ0FBQ0UsTUFBSixDQUFXLE9BQVg7QUFDRCxDQUZEO0FBSUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlQsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEByb3V0ZSAvXG4gKi9cbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLyogR0VUIGhvbWUgcGFnZS4gKi9cbnJvdXRlci5nZXQoJy8nLCBmdW5jdGlvbihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xuICByZXMucmVuZGVyKCdpbmRleCcpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuIl19