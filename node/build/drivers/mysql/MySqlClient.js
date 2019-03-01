'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Database connection and executing queries
 */
var Bluebird = require('bluebird'),
    mysql = require('mysql2/promise'),
    p = console.log;

/**
 * @param { object } DB_CONF
 * @param { String } tag
 *  sample
 * {
 *   "host": "localhost",
 *   "user": "root",
 *   "password": "password",
 *   "database": "testDB",
 *   "port": 3306,
 *   "ssl": false,
 *   "connectTimeout": 5000
 *   "connectionLimit": 100
 * }
 */

var MySqlClient = function () {
  function MySqlClient(DB_CONF, tag) {
    _classCallCheck(this, MySqlClient);

    DB_CONF.Promise = Bluebird;
    this.pool = mysql.createPool(DB_CONF);
    this.tag = tag;
  }

  /**
   * executes queries.
   * execute function builds a complete query with given params.
   * @param { String } query
   * @param { Array } params
   * @param { Connection } conn *optional
   * @return { Promise<Array<*>> }
   * @throws { Promise<Error> }
   */


  _createClass(MySqlClient, [{
    key: 'execute',
    value: async function execute(query, params) {
      var conn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.pool;

      try {
        if (params.length === 0) throw new Error('Empty Params. Use query() for executing raw queries.');
        if (params.some(function (e) {
          return e == undefined;
        })) throw new Error('Params contains undefined.');

        var _ref = await conn.execute(query, params),
            _ref2 = _slicedToArray(_ref, 2),
            rows = _ref2[0],
            fields = _ref2[1];

        return Array.isArray(rows) ? _cleanResult(rows) : rows;
      } catch (error) {
        throw new MySqlError(error);
      }
    }

    /**
     * executes raw queries.
     * @param { String } query
     * @param { Connection } conn *optional
     * @return { Promise<Array<*>> }
     * @throws { Promise<Error> }
     */

  }, {
    key: 'query',
    value: async function query(_query, conn) {
      try {
        var connection = conn ? conn : this.pool;

        var _ref3 = await connection.query(_query),
            _ref4 = _slicedToArray(_ref3, 2),
            rows = _ref4[0],
            fields = _ref4[1];

        return Array.isArray(rows) ? _cleanResult(rows) : rows;
      } catch (error) {
        throw new MySqlError(error);
      }
    }

    /**
     * get a connection for transaction
     * DO NOT FORGET TO RELEASE THE CONNECTION
     * @return { Promise<Connection> }
     */

  }, {
    key: 'getSingleConnection',
    value: async function getSingleConnection() {
      try {
        return await this.pool.getConnection();
      } catch (error) {
        throw new MySqlError(error);
      }
    }
  }]);

  return MySqlClient;
}();

/**
 *  eliminate 'TextRow', 'BinaryRow' from the result rows and return object array
 *  if rows is empty, it returns an empty array
 * @param { [object...] } rows
 * @return { Array<*> }
 */

var _cleanResult = function _cleanResult(rows) {
  return rows.map(function (r) {
    return JSON.parse(JSON.stringify(r).replace('TextRow', '').replace('BinaryRow', ''));
  });
};

/**
 * MySql2 module error class
 */

var MySqlError = function (_Error) {
  _inherits(MySqlError, _Error);

  function MySqlError(error_object) {
    _classCallCheck(this, MySqlError);

    var _this = _possibleConstructorReturn(this, (MySqlError.__proto__ || Object.getPrototypeOf(MySqlError)).call(this, error_object.message));

    _this.message = error_object.message;
    _this.isConnectionError = ['ECONNREFUSED', 'ER_HOST_IS_BLOCKED', 'ETIMEDOUT'].some(function (c) {
      return c == error_object.code;
    });
    _this.statusCode = 500;
    return _this;
  }

  return MySqlError;
}(Error);

exports.MySqlClient = MySqlClient;
exports.MySqlError = MySqlError;