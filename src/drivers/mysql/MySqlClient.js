/**
 *  Database connection and executing queries
 */
const Bluebird = require('bluebird'),
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
class MySqlClient {
  constructor(DB_CONF, tag) {
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
  async execute(query, params, conn = this.pool) {
    try {
      if (params.length === 0) throw new Error('Empty Params. Use query() for executing raw queries.');
      if (params.some(e => e == undefined)) throw new Error('Params contains undefined.');
      const [rows, fields] = await conn.execute(query, params);
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
  async query(query, conn) {
    try {
      const connection = conn ? conn : this.pool;
      const [rows, fields] = await connection.query(query);
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
  async getSingleConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      throw new MySqlError(error);
    }
  }
}

/**
 *  eliminate 'TextRow', 'BinaryRow' from the result rows and return object array
 *  if rows is empty, it returns an empty array
 * @param { [object...] } rows
 * @return { Array<*> }
 */

let _cleanResult = rows =>
  rows.map(r =>
    JSON.parse(
      JSON.stringify(r)
        .replace('TextRow', '')
        .replace('BinaryRow', '')
    )
  );

/**
 * MySql2 module error class
 */
class MySqlError extends Error {
  constructor(error_object) {
    super(error_object.message);
    this.message = error_object.message;
    this.isConnectionError = ['ECONNREFUSED', 'ER_HOST_IS_BLOCKED', 'ETIMEDOUT'].some(c => c == error_object.code);
    this.statusCode = 500;
  }
}

export { MySqlClient, MySqlError };
