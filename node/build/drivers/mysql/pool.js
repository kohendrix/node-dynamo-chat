"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.master = void 0;

var _MySqlClient = require("./MySqlClient");

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const master = new _MySqlClient.MySqlClient(_config.default.mysql.master, 'master'); // const slave1 = new MySqlClient(config.mysql.slave1, 'slave1');
// const slave2 = new MySqlClient(config.mysql.slave2, 'slave2');
// function randomClient() {
//   var i = Date.now() / 3;
//   return i == 0 ? master : 1 ? slave1 : slave2;
// }

exports.master = master;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL215c3FsL3Bvb2wuanMiXSwibmFtZXMiOlsibWFzdGVyIiwiTXlTcWxDbGllbnQiLCJjb25maWciLCJteXNxbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0EsTUFBTUEsTUFBTSxHQUFHLElBQUlDLHdCQUFKLENBQWdCQyxnQkFBT0MsS0FBUCxDQUFhSCxNQUE3QixFQUFxQyxRQUFyQyxDQUFmLEMsQ0FDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNeVNxbENsaWVudCB9IGZyb20gJy4vTXlTcWxDbGllbnQnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnO1xuY29uc3QgbWFzdGVyID0gbmV3IE15U3FsQ2xpZW50KGNvbmZpZy5teXNxbC5tYXN0ZXIsICdtYXN0ZXInKTtcbi8vIGNvbnN0IHNsYXZlMSA9IG5ldyBNeVNxbENsaWVudChjb25maWcubXlzcWwuc2xhdmUxLCAnc2xhdmUxJyk7XG4vLyBjb25zdCBzbGF2ZTIgPSBuZXcgTXlTcWxDbGllbnQoY29uZmlnLm15c3FsLnNsYXZlMiwgJ3NsYXZlMicpO1xuXG4vLyBmdW5jdGlvbiByYW5kb21DbGllbnQoKSB7XG4vLyAgIHZhciBpID0gRGF0ZS5ub3coKSAvIDM7XG4vLyAgIHJldHVybiBpID09IDAgPyBtYXN0ZXIgOiAxID8gc2xhdmUxIDogc2xhdmUyO1xuLy8gfVxuXG5leHBvcnQge1xuICBtYXN0ZXJcbiAgLy8gc2xhdmUxOiBzbGF2ZTEsXG4gIC8vIHNsYXZlMjogc2xhdmUyLFxuICAvLyB3cml0ZTogbWFzdGVyLFxuICAvLyByZWFkOiByYW5kb21DbGllbnQoKVxufTtcbiJdfQ==