"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = getClient;

var _logger = require("../../commons/util/logger");

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p = (0, _logger.logD)(__filename);
/**
 * A thin wrapper for RedisClient.
 * @param options
 */

function getClient(options) {
  return _redis.default.createClient(options).on('error', err => (0, _logger.logE)(err)).on('ready', () => p('redis is ready')).on('connect', () => p('redis is connected')).on('reconnecting', () => p('redis is reconnecting...')).on('end', () => p('redis connection closed'));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL3JlZGlzL3JlZGlzQ2xpZW50LnRzIl0sIm5hbWVzIjpbInAiLCJfX2ZpbGVuYW1lIiwiZ2V0Q2xpZW50Iiwib3B0aW9ucyIsInJlZGlzIiwiY3JlYXRlQ2xpZW50Iiwib24iLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLE1BQU1BLENBQUMsR0FBRyxrQkFBS0MsVUFBTCxDQUFWO0FBRUE7Ozs7O0FBSU8sU0FBU0MsU0FBVCxDQUFtQkMsT0FBbkIsRUFBcUQ7QUFDMUQsU0FBT0MsZUFDSkMsWUFESSxDQUNTRixPQURULEVBRUpHLEVBRkksQ0FFRCxPQUZDLEVBRVFDLEdBQUcsSUFBSSxrQkFBS0EsR0FBTCxDQUZmLEVBR0pELEVBSEksQ0FHRCxPQUhDLEVBR1EsTUFBTU4sQ0FBQyxDQUFDLGdCQUFELENBSGYsRUFJSk0sRUFKSSxDQUlELFNBSkMsRUFJVSxNQUFNTixDQUFDLENBQUMsb0JBQUQsQ0FKakIsRUFLSk0sRUFMSSxDQUtELGNBTEMsRUFLZSxNQUFNTixDQUFDLENBQUMsMEJBQUQsQ0FMdEIsRUFNSk0sRUFOSSxDQU1ELEtBTkMsRUFNTSxNQUFNTixDQUFDLENBQUMseUJBQUQsQ0FOYixDQUFQO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2csIGxvZ0UsIGxvZ0QgfSBmcm9tICcuLi8uLi9jb21tb25zL3V0aWwvbG9nZ2VyJztcbmltcG9ydCByZWRpcywgeyBSZWRpc0NsaWVudCwgQ2xpZW50T3B0cyB9IGZyb20gJ3JlZGlzJztcbmNvbnN0IHAgPSBsb2dEKF9fZmlsZW5hbWUpO1xuXG4vKipcbiAqIEEgdGhpbiB3cmFwcGVyIGZvciBSZWRpc0NsaWVudC5cbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGllbnQob3B0aW9uczogQ2xpZW50T3B0cyk6IFJlZGlzQ2xpZW50IHtcbiAgcmV0dXJuIHJlZGlzXG4gICAgLmNyZWF0ZUNsaWVudChvcHRpb25zKVxuICAgIC5vbignZXJyb3InLCBlcnIgPT4gbG9nRShlcnIpKVxuICAgIC5vbigncmVhZHknLCAoKSA9PiBwKCdyZWRpcyBpcyByZWFkeScpKVxuICAgIC5vbignY29ubmVjdCcsICgpID0+IHAoJ3JlZGlzIGlzIGNvbm5lY3RlZCcpKVxuICAgIC5vbigncmVjb25uZWN0aW5nJywgKCkgPT4gcCgncmVkaXMgaXMgcmVjb25uZWN0aW5nLi4uJykpXG4gICAgLm9uKCdlbmQnLCAoKSA9PiBwKCdyZWRpcyBjb25uZWN0aW9uIGNsb3NlZCcpKTtcbn1cbiJdfQ==