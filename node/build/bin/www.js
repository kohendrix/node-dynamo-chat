#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _app = require("../app");

var _logger = require("../commons/util/logger");

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p = (0, _logger.logD)(__filename),
      config = require('config');
/**
 * Get port from environment and store in Express.
 */


const port = config.server.port || 3000;

_app.app.set('port', port);
/**
 * Create HTTP server.
 */


const server = _http.default.createServer(_app.app);
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  (0, _logger.log)('Listening on ' + bind);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vd3d3LnRzIl0sIm5hbWVzIjpbInAiLCJfX2ZpbGVuYW1lIiwiY29uZmlnIiwicmVxdWlyZSIsInBvcnQiLCJzZXJ2ZXIiLCJhcHAiLCJzZXQiLCJodHRwIiwiY3JlYXRlU2VydmVyIiwibGlzdGVuIiwib24iLCJvbkVycm9yIiwib25MaXN0ZW5pbmciLCJlcnJvciIsInN5c2NhbGwiLCJiaW5kIiwiY29kZSIsImNvbnNvbGUiLCJwcm9jZXNzIiwiZXhpdCIsImFkZHIiLCJhZGRyZXNzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU1BLENBQUMsR0FBRyxrQkFBS0MsVUFBTCxDQUFWO0FBQUEsTUFDRUMsTUFBb0IsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FEaEM7QUFHQTs7Ozs7QUFJQSxNQUFNQyxJQUFJLEdBQUdGLE1BQU0sQ0FBQ0csTUFBUCxDQUFjRCxJQUFkLElBQXNCLElBQW5DOztBQUNBRSxTQUFJQyxHQUFKLENBQVEsTUFBUixFQUFnQkgsSUFBaEI7QUFFQTs7Ozs7QUFJQSxNQUFNQyxNQUFNLEdBQUdHLGNBQUtDLFlBQUwsQ0FBa0JILFFBQWxCLENBQWY7QUFFQTs7Ozs7QUFJQUQsTUFBTSxDQUFDSyxNQUFQLENBQWNOLElBQWQ7QUFDQUMsTUFBTSxDQUFDTSxFQUFQLENBQVUsT0FBVixFQUFtQkMsT0FBbkI7QUFDQVAsTUFBTSxDQUFDTSxFQUFQLENBQVUsV0FBVixFQUF1QkUsV0FBdkI7QUFFQTs7OztBQUlBLFNBQVNELE9BQVQsQ0FBaUJFLEtBQWpCLEVBQXNDO0FBQ3BDLE1BQUlBLEtBQUssQ0FBQ0MsT0FBTixLQUFrQixRQUF0QixFQUFnQztBQUM5QixVQUFNRCxLQUFOO0FBQ0Q7O0FBRUQsUUFBTUUsSUFBSSxHQUFHLE9BQU9aLElBQVAsS0FBZ0IsUUFBaEIsR0FBMkIsVUFBVUEsSUFBckMsR0FBNEMsVUFBVUEsSUFBbkUsQ0FMb0MsQ0FPcEM7O0FBQ0EsVUFBUVUsS0FBSyxDQUFDRyxJQUFkO0FBQ0UsU0FBSyxRQUFMO0FBQ0VDLE1BQUFBLE9BQU8sQ0FBQ0osS0FBUixDQUFjRSxJQUFJLEdBQUcsK0JBQXJCO0FBQ0FHLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWI7QUFDQTs7QUFDRixTQUFLLFlBQUw7QUFDRUYsTUFBQUEsT0FBTyxDQUFDSixLQUFSLENBQWNFLElBQUksR0FBRyxvQkFBckI7QUFDQUcsTUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQUNBOztBQUNGO0FBQ0UsWUFBTU4sS0FBTjtBQVZKO0FBWUQ7QUFFRDs7Ozs7QUFHQSxTQUFTRCxXQUFULEdBQXVCO0FBQ3JCLFFBQU1RLElBQUksR0FBR2hCLE1BQU0sQ0FBQ2lCLE9BQVAsRUFBYjtBQUNBLFFBQU1OLElBQUksR0FBRyxPQUFPSyxJQUFQLEtBQWdCLFFBQWhCLEdBQTJCLFVBQVVBLElBQXJDLEdBQTRDLFVBQVVBLElBQUksQ0FBQ2pCLElBQXhFO0FBQ0EsbUJBQUksa0JBQWtCWSxJQUF0QjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uL2FwcCc7XG5pbXBvcnQgeyBsb2csIGxvZ0UsIGxvZ0QgfSBmcm9tICcuLi9jb21tb25zL3V0aWwvbG9nZ2VyJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgRXhwcmVzc0Vycm9yIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9FeHByZXNzRXJyb3InO1xuaW1wb3J0IHsgQ29uZmlnU2NoZW1hIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9Db25maWdTY2hlbWEnO1xuY29uc3QgcCA9IGxvZ0QoX19maWxlbmFtZSksXG4gIGNvbmZpZzogQ29uZmlnU2NoZW1hID0gcmVxdWlyZSgnY29uZmlnJyk7XG5cbi8qKlxuICogR2V0IHBvcnQgZnJvbSBlbnZpcm9ubWVudCBhbmQgc3RvcmUgaW4gRXhwcmVzcy5cbiAqL1xuXG5jb25zdCBwb3J0ID0gY29uZmlnLnNlcnZlci5wb3J0IHx8IDMwMDA7XG5hcHAuc2V0KCdwb3J0JywgcG9ydCk7XG5cbi8qKlxuICogQ3JlYXRlIEhUVFAgc2VydmVyLlxuICovXG5cbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbi8qKlxuICogTGlzdGVuIG9uIHByb3ZpZGVkIHBvcnQsIG9uIGFsbCBuZXR3b3JrIGludGVyZmFjZXMuXG4gKi9cblxuc2VydmVyLmxpc3Rlbihwb3J0KTtcbnNlcnZlci5vbignZXJyb3InLCBvbkVycm9yKTtcbnNlcnZlci5vbignbGlzdGVuaW5nJywgb25MaXN0ZW5pbmcpO1xuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImVycm9yXCIgZXZlbnQuXG4gKi9cblxuZnVuY3Rpb24gb25FcnJvcihlcnJvcjogRXhwcmVzc0Vycm9yKSB7XG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgY29uc3QgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJyA/ICdQaXBlICcgKyBwb3J0IDogJ1BvcnQgJyArIHBvcnQ7XG5cbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xuICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICBjYXNlICdFQUNDRVMnOlxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJyk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFQUREUklOVVNFJzpcbiAgICAgIGNvbnNvbGUuZXJyb3IoYmluZCArICcgaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImxpc3RlbmluZ1wiIGV2ZW50LlxuICovXG5mdW5jdGlvbiBvbkxpc3RlbmluZygpIHtcbiAgY29uc3QgYWRkciA9IHNlcnZlci5hZGRyZXNzKCk7XG4gIGNvbnN0IGJpbmQgPSB0eXBlb2YgYWRkciA9PT0gJ3N0cmluZycgPyAncGlwZSAnICsgYWRkciA6ICdwb3J0ICcgKyBhZGRyLnBvcnQ7XG4gIGxvZygnTGlzdGVuaW5nIG9uICcgKyBiaW5kKTtcbn1cbiJdfQ==