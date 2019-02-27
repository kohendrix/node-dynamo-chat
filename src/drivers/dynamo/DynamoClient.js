const AWS = require('aws-sdk');
const config = require('config');
const p = console.log;
AWS.config.logger = console;

AWS.config.update({
  sslEnabled: config.aws.sslEnabled,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
  endpoint: config.aws.endpoint
});

const db = new AWS.DynamoDB();

/**
 * put a single object
 * @param { object } params
 */
async function putItem(params) {
  try {
    return await db.putItem(params).promise();
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * get by the key
 * @param { object } params
 */
async function getItem(params) {
  try {
    const data = await db.getItem(params).promise();
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
    const data = await db.query(params).promise();
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
    const data = await db.scan(params).promise();
    return data.Items;
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * delete by the key
 * @param { object } params
 */
async function deleteItem(params) {
  try {
    return await db.deleteItem(params).promise();
  } catch (error) {
    throw new DynamoError(error);
  }
}

/**
 * module error class
 */
class DynamoError extends Error {
  constructor(error) {
    super(error.message);
    this.message = error.message;
    this.statusCode = 500;
  }
}

module.exports = { 
  putItem: putItem, 
  getItem: getItem,
  queryTable: queryTable,
  scanTable: scanTable, 
  deleteItem: deleteItem 
};
