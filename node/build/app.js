"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _logger = require("./commons/util/logger");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = require('config');

const p = (0, _logger.logD)(__filename),
      app = (0, _express.default)(); // view engine setup

exports.app = app;
app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // plugins

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, 'public'))); // app.use(
//   session({
//     secret: 'secretkey',
//     store: new RedisStore({
//       host: 'redis',
//       port: 6379,
//       prefix: 'sid:',
//       ttl: 1800,
//     }),
//     saveUninitialized: true,
//   }),
// );
// routing

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatroom')); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsInAiLCJfX2ZpbGVuYW1lIiwiYXBwIiwic2V0IiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ1c2UiLCJleHByZXNzIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInN0YXRpYyIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJsb2NhbHMiLCJtZXNzYWdlIiwiZXJyb3IiLCJnZXQiLCJzdGF0dXMiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7O0FBQ0EsTUFBTUMsQ0FBQyxHQUFHLGtCQUFLQyxVQUFMLENBQVY7QUFBQSxNQUNFQyxHQUFHLEdBQUcsdUJBRFIsQyxDQUdBOzs7QUFDQUEsR0FBRyxDQUFDQyxHQUFKLENBQVEsT0FBUixFQUFpQkMsY0FBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLE9BQXJCLENBQWpCO0FBQ0FKLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLGFBQVIsRUFBdUIsS0FBdkIsRSxDQUVBOztBQUNBRCxHQUFHLENBQUNLLEdBQUosQ0FBUSxxQkFBTyxLQUFQLENBQVI7QUFDQUwsR0FBRyxDQUFDSyxHQUFKLENBQVFDLGlCQUFRQyxJQUFSLEVBQVI7QUFDQVAsR0FBRyxDQUFDSyxHQUFKLENBQVFDLGlCQUFRRSxVQUFSLENBQW1CO0FBQUVDLEVBQUFBLFFBQVEsRUFBRTtBQUFaLENBQW5CLENBQVI7QUFDQVQsR0FBRyxDQUFDSyxHQUFKLENBQVEsNEJBQVI7QUFDQUwsR0FBRyxDQUFDSyxHQUFKLENBQVFDLGlCQUFRSSxNQUFSLENBQWVSLGNBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixRQUFyQixDQUFmLENBQVIsRSxDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBSixHQUFHLENBQUNLLEdBQUosQ0FBUSxHQUFSLEVBQWFSLE9BQU8sQ0FBQyxnQkFBRCxDQUFwQjtBQUNBRyxHQUFHLENBQUNLLEdBQUosQ0FBUSxPQUFSLEVBQWlCUixPQUFPLENBQUMsZUFBRCxDQUF4QjtBQUNBRyxHQUFHLENBQUNLLEdBQUosQ0FBUSxXQUFSLEVBQXFCUixPQUFPLENBQUMsbUJBQUQsQ0FBNUIsRSxDQUVBOztBQUNBRyxHQUFHLENBQUNLLEdBQUosQ0FBUSxVQUFTTSxHQUFULEVBQWNDLEdBQWQsRUFBbUJDLElBQW5CLEVBQXlCO0FBQy9CQSxFQUFBQSxJQUFJLENBQUMseUJBQVksR0FBWixDQUFELENBQUo7QUFDRCxDQUZELEUsQ0FJQTs7QUFDQWIsR0FBRyxDQUFDSyxHQUFKLENBQVEsVUFBU1MsR0FBVCxFQUE0QkgsR0FBNUIsRUFBa0RDLEdBQWxELEVBQXlFQyxJQUF6RSxFQUFxRztBQUMzRztBQUNBRCxFQUFBQSxHQUFHLENBQUNHLE1BQUosQ0FBV0MsT0FBWCxHQUFxQkYsR0FBRyxDQUFDRSxPQUF6QjtBQUNBSixFQUFBQSxHQUFHLENBQUNHLE1BQUosQ0FBV0UsS0FBWCxHQUFtQk4sR0FBRyxDQUFDWCxHQUFKLENBQVFrQixHQUFSLENBQVksS0FBWixNQUF1QixhQUF2QixHQUF1Q0osR0FBdkMsR0FBNkMsRUFBaEUsQ0FIMkcsQ0FLM0c7O0FBQ0FGLEVBQUFBLEdBQUcsQ0FBQ08sTUFBSixDQUFXTCxHQUFHLENBQUNLLE1BQUosSUFBYyxHQUF6QjtBQUNBUCxFQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxPQUFYO0FBQ0QsQ0FSRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZywgbG9nRSwgbG9nRCB9IGZyb20gJy4vY29tbW9ucy91dGlsL2xvZ2dlcic7XG5pbXBvcnQgY3JlYXRlRXJyb3IgZnJvbSAnaHR0cC1lcnJvcnMnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0IFJlZGlzU3RvcmUgZnJvbSAnY29ubmVjdC1yZWRpcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBFeHByZXNzRXJyb3IgfSBmcm9tICcuLi9zcmMvaW50ZXJmYWNlcy9FeHByZXNzRXJyb3InO1xuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnY29uZmlnJyk7XG5jb25zdCBwID0gbG9nRChfX2ZpbGVuYW1lKSxcbiAgYXBwID0gZXhwcmVzcygpO1xuXG4vLyB2aWV3IGVuZ2luZSBzZXR1cFxuYXBwLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lLCAndmlld3MnKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdlanMnKTtcblxuLy8gcGx1Z2luc1xuYXBwLnVzZShsb2dnZXIoJ2RldicpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMnKSkpO1xuLy8gYXBwLnVzZShcbi8vICAgc2Vzc2lvbih7XG4vLyAgICAgc2VjcmV0OiAnc2VjcmV0a2V5Jyxcbi8vICAgICBzdG9yZTogbmV3IFJlZGlzU3RvcmUoe1xuLy8gICAgICAgaG9zdDogJ3JlZGlzJyxcbi8vICAgICAgIHBvcnQ6IDYzNzksXG4vLyAgICAgICBwcmVmaXg6ICdzaWQ6Jyxcbi8vICAgICAgIHR0bDogMTgwMCxcbi8vICAgICB9KSxcbi8vICAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbi8vICAgfSksXG4vLyApO1xuXG4vLyByb3V0aW5nXG5hcHAudXNlKCcvJywgcmVxdWlyZSgnLi9yb3V0ZXMvaW5kZXgnKSk7XG5hcHAudXNlKCcvdXNlcicsIHJlcXVpcmUoJy4vcm91dGVzL3VzZXInKSk7XG5hcHAudXNlKCcvY2hhdHJvb20nLCByZXF1aXJlKCcuL3JvdXRlcy9jaGF0cm9vbScpKTtcblxuLy8gY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgbmV4dChjcmVhdGVFcnJvcig0MDQpKTtcbn0pO1xuXG4vLyBlcnJvciBoYW5kbGVyXG5hcHAudXNlKGZ1bmN0aW9uKGVycjogRXhwcmVzc0Vycm9yLCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xuICAvLyBzZXQgbG9jYWxzLCBvbmx5IHByb3ZpZGluZyBlcnJvciBpbiBkZXZlbG9wbWVudFxuICByZXMubG9jYWxzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgcmVzLmxvY2Fscy5lcnJvciA9IHJlcS5hcHAuZ2V0KCdlbnYnKSA9PT0gJ2RldmVsb3BtZW50JyA/IGVyciA6IHt9O1xuXG4gIC8vIHJlbmRlciB0aGUgZXJyb3IgcGFnZVxuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgcmVzLnJlbmRlcignZXJyb3InKTtcbn0pO1xuXG5leHBvcnQgeyBhcHAgfTtcbiJdfQ==