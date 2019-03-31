"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Signup = void 0;

var _logger = require("../../commons/util/logger");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const p = (0, _logger.logD)(__filename);

class Signup {
  constructor() {
    _defineProperty(this, "getSync", async (req, res, next) => {
      res.render('signup');
      return;
    });

    _defineProperty(this, "postSync", async (req, res, next) => {
      res.send({
        message: 'signup'
      });
      return;
    });
  }

}

exports.Signup = Signup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL3JlcXVlc3RIYW5kbGVycy9zaWdudXAudHMiXSwibmFtZXMiOlsicCIsIl9fZmlsZW5hbWUiLCJTaWdudXAiLCJjb25zdHJ1Y3RvciIsInJlcSIsInJlcyIsIm5leHQiLCJyZW5kZXIiLCJzZW5kIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0EsTUFBTUEsQ0FBQyxHQUFHLGtCQUFLQyxVQUFMLENBQVY7O0FBRU8sTUFBTUMsTUFBTixDQUFhO0FBQ2xCQyxFQUFBQSxXQUFXLEdBQUc7QUFBQSxxQ0FFSixPQUFPQyxHQUFQLEVBQTZCQyxHQUE3QixFQUFvREMsSUFBcEQsS0FBa0c7QUFDMUdELE1BQUFBLEdBQUcsQ0FBQ0UsTUFBSixDQUFXLFFBQVg7QUFDQTtBQUNELEtBTGE7O0FBQUEsc0NBT0gsT0FBT0gsR0FBUCxFQUE2QkMsR0FBN0IsRUFBb0RDLElBQXBELEtBQWtHO0FBQzNHRCxNQUFBQSxHQUFHLENBQUNHLElBQUosQ0FBUztBQUFFQyxRQUFBQSxPQUFPLEVBQUU7QUFBWCxPQUFUO0FBQ0E7QUFDRCxLQVZhO0FBQUU7O0FBREUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGxvZywgbG9nRSwgbG9nRCB9IGZyb20gJy4uLy4uL2NvbW1vbnMvdXRpbC9sb2dnZXInO1xuY29uc3QgcCA9IGxvZ0QoX19maWxlbmFtZSk7XG5cbmV4cG9ydCBjbGFzcyBTaWdudXAge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0U3luYyA9IGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJlcy5yZW5kZXIoJ3NpZ251cCcpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICBwb3N0U3luYyA9IGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ3NpZ251cCcgfSk7XG4gICAgcmV0dXJuO1xuICB9O1xufVxuIl19