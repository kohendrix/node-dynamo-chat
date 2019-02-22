'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.master = undefined;

var _MySqlClient = require('./MySqlClient');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var master = new _MySqlClient.MySqlClient(_config2.default.mysql.master, 'master');
// const slave1 = new MySqlClient(config.mysql.slave1, 'slave1');
// const slave2 = new MySqlClient(config.mysql.slave2, 'slave2');

// function randomClient() {
//   var i = Date.now() / 3;
//   return i == 0 ? master : 1 ? slave1 : slave2;
// }

exports.master = master;