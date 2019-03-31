"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logD = exports.logE = exports.log = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Common log module with debug.
 * On default, debug module will send logs to stderr.
 * Using log() here will send them to stdout.
 * ref => https://www.npmjs.com/package/debug
 */

/* output stream */
// stdout
const log = (0, _debug.default)('app:log');
exports.log = log;
log.log = console.log.bind(console); // stderr

const logE = (0, _debug.default)('app:error'); // for debug, pass __filename to initialize

exports.logE = logE;

const logD = filepath => (0, _debug.default)('debug:' + filepath.split('/').pop());

exports.logD = logD;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb25zL3V0aWwvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbImxvZyIsImNvbnNvbGUiLCJiaW5kIiwibG9nRSIsImxvZ0QiLCJmaWxlcGF0aCIsInNwbGl0IiwicG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUE7Ozs7QUFOQTs7Ozs7OztBQVFBO0FBQ0E7QUFDQSxNQUFNQSxHQUFHLEdBQUcsb0JBQU0sU0FBTixDQUFaOztBQUNBQSxHQUFHLENBQUNBLEdBQUosR0FBVUMsT0FBTyxDQUFDRCxHQUFSLENBQVlFLElBQVosQ0FBaUJELE9BQWpCLENBQVYsQyxDQUVBOztBQUNBLE1BQU1FLElBQUksR0FBRyxvQkFBTSxXQUFOLENBQWIsQyxDQUVBOzs7O0FBQ0EsTUFBTUMsSUFBYyxHQUFJQyxRQUFELElBQXNCLG9CQUFNLFdBQVdBLFFBQVEsQ0FBQ0MsS0FBVCxDQUFlLEdBQWYsRUFBb0JDLEdBQXBCLEVBQWpCLENBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb21tb24gbG9nIG1vZHVsZSB3aXRoIGRlYnVnLlxuICogT24gZGVmYXVsdCwgZGVidWcgbW9kdWxlIHdpbGwgc2VuZCBsb2dzIHRvIHN0ZGVyci5cbiAqIFVzaW5nIGxvZygpIGhlcmUgd2lsbCBzZW5kIHRoZW0gdG8gc3Rkb3V0LlxuICogcmVmID0+IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2RlYnVnXG4gKi9cbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbi8qIG91dHB1dCBzdHJlYW0gKi9cbi8vIHN0ZG91dFxuY29uc3QgbG9nID0gZGVidWcoJ2FwcDpsb2cnKTtcbmxvZy5sb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuXG4vLyBzdGRlcnJcbmNvbnN0IGxvZ0UgPSBkZWJ1ZygnYXBwOmVycm9yJyk7XG5cbi8vIGZvciBkZWJ1ZywgcGFzcyBfX2ZpbGVuYW1lIHRvIGluaXRpYWxpemVcbmNvbnN0IGxvZ0Q6IEZ1bmN0aW9uID0gKGZpbGVwYXRoOiBzdHJpbmcpID0+IGRlYnVnKCdkZWJ1ZzonICsgZmlsZXBhdGguc3BsaXQoJy8nKS5wb3AoKSk7XG5cbmV4cG9ydCB7IGxvZywgbG9nRSwgbG9nRCB9O1xuIl19