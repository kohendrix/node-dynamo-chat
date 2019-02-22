import AWS from 'aws-sdk';
import config from 'config';
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
 * @param { string } table_name
 * @param { object } item
 */
async function putItem(table_name, item) {
  try {
    const params = {
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
    let params = {
      TableName: table_name,
      Key: key
    };
    if (projection_exp) params.ProjectionExpression = projection_exp;
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
 * @param { string } table_name
 * @param { object } key : schema { 'KEYNAME': { DATA_YPE : 'VALUE' } }
 */
async function deleteItem(table_name, key) {
  try {
    const params = {
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
class DynamoError extends Error {
  constructor(error_object) {
    super(error_object.message);
    this.message = error_object.message;
    this.statusCode = 500;
  }
}

export default { putItem, getItem, queryTable, scanTable, deleteItem };
