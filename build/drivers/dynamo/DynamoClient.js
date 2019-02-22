'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var p = console.log;
_awsSdk2.default.config.logger = console;

_awsSdk2.default.config.update({
  sslEnabled: _config2.default.aws.sslEnabled,
  accessKeyId: _config2.default.aws.accessKeyId,
  secretAccessKey: _config2.default.aws.secretAccessKey,
  region: _config2.default.aws.region,
  endpoint: _config2.default.aws.endpoint
});

var db = new _awsSdk2.default.DynamoDB();

/**
 * put a single object
 * @param { string } table_name
 * @param { object } item
 */
async function putItem(table_name, item) {
  try {
    var params = {
      TableName: table_name,
      Item: item
    };
    return await db.putItem(params).promise();
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * get by the key
 * @param { string } table_name
 * @param { object } key : schema { 'KEYNAME': { DATA_YPE : 'VALUE' } }
 * @param { string } projection_exp *optional
 */
async function getItem(table_name, key, projection_exp) {
  try {
    var params = {
      TableName: table_name,
      Key: key
    };
    if (projection_exp) params.ProjectionExpression = projection_exp;
    var data = await db.getItem(params).promise();
    return data.Item;
  } catch (error) {
    p(error);
    throw new DynamoError(error);
  }
}

/**
 * @param { obj } params
 */
async function queryTable(params) {
  try {
    var data = await db.query(params).promise();
    return data.Items;
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * @param { obj } params
 */
async function scanTable(params) {
  try {
    var data = await db.scan(params).promise();
    return data.Items;
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * delete by the key
 * @param { string } table_name
 * @param { object } key : schema { 'KEYNAME': { DATA_YPE : 'VALUE' } }
 */
async function deleteItem(table_name, key) {
  try {
    var params = {
      TableName: table_name,
      Key: key
    };
    return await db.deleteItem(params).promise();
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * module error class
 */

var DynamoError = function (_Error) {
  _inherits(DynamoError, _Error);

  function DynamoError(error_object) {
    _classCallCheck(this, DynamoError);

    var _this = _possibleConstructorReturn(this, (DynamoError.__proto__ || Object.getPrototypeOf(DynamoError)).call(this, error_object.message));

    _this.message = error_object.message;
    _this.statusCode = 500;
    return _this;
  }

  return DynamoError;
}(Error);

exports.default = { putItem: putItem, getItem: getItem, queryTable: queryTable, scanTable: scanTable, deleteItem: deleteItem };