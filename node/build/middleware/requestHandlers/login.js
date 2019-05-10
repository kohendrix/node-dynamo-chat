"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = void 0;

var _logger = require("../../commons/util/logger");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const p = (0, _logger.logD)(__filename);

class Login {
  constructor() {
    _defineProperty(this, "postSync", async (req, res, next) => {
      const isValid = true;

      if (isValid) {
        res.render('home');
      } else {
        res.render('index', {
          error: 'Invalid login info!'
        });
      }

      next();
    });

    _defineProperty(this, "post", (req, res, next) => {
      return;
    });
  }

}

exports.Login = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL3JlcXVlc3RIYW5kbGVycy9sb2dpbi50cyJdLCJuYW1lcyI6WyJwIiwiX19maWxlbmFtZSIsIkxvZ2luIiwiY29uc3RydWN0b3IiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaXNWYWxpZCIsInJlbmRlciIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQSxNQUFNQSxDQUFDLEdBQUcsa0JBQUtDLFVBQUwsQ0FBVjs7QUFFTyxNQUFNQyxLQUFOLENBQVk7QUFDakJDLEVBQUFBLFdBQVcsR0FBRztBQUFBLHNDQUVILE9BQU9DLEdBQVAsRUFBNkJDLEdBQTdCLEVBQW9EQyxJQUFwRCxLQUFtRjtBQUM1RixZQUFNQyxPQUFPLEdBQUcsSUFBaEI7O0FBQ0EsVUFBSUEsT0FBSixFQUFhO0FBQ1hGLFFBQUFBLEdBQUcsQ0FBQ0csTUFBSixDQUFXLE1BQVg7QUFDRCxPQUZELE1BRU87QUFDTEgsUUFBQUEsR0FBRyxDQUFDRyxNQUFKLENBQVcsT0FBWCxFQUFvQjtBQUFFQyxVQUFBQSxLQUFLLEVBQUU7QUFBVCxTQUFwQjtBQUNEOztBQUNESCxNQUFBQSxJQUFJO0FBQ0wsS0FWYTs7QUFBQSxrQ0FZUCxDQUFDRixHQUFELEVBQXVCQyxHQUF2QixFQUE4Q0MsSUFBOUMsS0FBNkU7QUFDbEY7QUFDRCxLQWRhO0FBQUU7O0FBREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGxvZywgbG9nRSwgbG9nRCB9IGZyb20gJy4uLy4uL2NvbW1vbnMvdXRpbC9sb2dnZXInO1xuY29uc3QgcCA9IGxvZ0QoX19maWxlbmFtZSk7XG5cbmV4cG9ydCBjbGFzcyBMb2dpbiB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwb3N0U3luYyA9IGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIGNvbnN0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICByZXMucmVuZGVyKCdob21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5yZW5kZXIoJ2luZGV4JywgeyBlcnJvcjogJ0ludmFsaWQgbG9naW4gaW5mbyEnIH0pO1xuICAgIH1cbiAgICBuZXh0KCk7XG4gIH07XG5cbiAgcG9zdCA9IChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIHJldHVybjtcbiAgfTtcbn1cbiJdfQ==