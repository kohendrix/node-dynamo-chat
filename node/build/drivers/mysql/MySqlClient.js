"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MySqlError = exports.MySqlClient = void 0;

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


exports.MySqlClient = MySqlClient;

let _cleanResult = rows => rows.map(r => JSON.parse(JSON.stringify(r).replace('TextRow', '').replace('BinaryRow', '')));
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

exports.MySqlError = MySqlError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kcml2ZXJzL215c3FsL015U3FsQ2xpZW50LmpzIl0sIm5hbWVzIjpbIkJsdWViaXJkIiwicmVxdWlyZSIsIm15c3FsIiwicCIsImNvbnNvbGUiLCJsb2ciLCJNeVNxbENsaWVudCIsImNvbnN0cnVjdG9yIiwiREJfQ09ORiIsInRhZyIsIlByb21pc2UiLCJwb29sIiwiY3JlYXRlUG9vbCIsImV4ZWN1dGUiLCJxdWVyeSIsInBhcmFtcyIsImNvbm4iLCJsZW5ndGgiLCJFcnJvciIsInNvbWUiLCJlIiwidW5kZWZpbmVkIiwicm93cyIsImZpZWxkcyIsIkFycmF5IiwiaXNBcnJheSIsIl9jbGVhblJlc3VsdCIsImVycm9yIiwiTXlTcWxFcnJvciIsImNvbm5lY3Rpb24iLCJnZXRTaW5nbGVDb25uZWN0aW9uIiwiZ2V0Q29ubmVjdGlvbiIsIm1hcCIsInIiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwiZXJyb3Jfb2JqZWN0IiwibWVzc2FnZSIsImlzQ29ubmVjdGlvbkVycm9yIiwiYyIsImNvZGUiLCJzdGF0dXNDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7OztBQUdBLE1BQU1BLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBeEI7QUFBQSxNQUNFQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQURqQjtBQUFBLE1BRUVFLENBQUMsR0FBR0MsT0FBTyxDQUFDQyxHQUZkO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsTUFBTUMsV0FBTixDQUFrQjtBQUNoQkMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVVDLEdBQVYsRUFBZTtBQUN4QkQsSUFBQUEsT0FBTyxDQUFDRSxPQUFSLEdBQWtCVixRQUFsQjtBQUNBLFNBQUtXLElBQUwsR0FBWVQsS0FBSyxDQUFDVSxVQUFOLENBQWlCSixPQUFqQixDQUFaO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFTQSxRQUFNSSxPQUFOLENBQWNDLEtBQWQsRUFBcUJDLE1BQXJCLEVBQTZCQyxJQUFJLEdBQUcsS0FBS0wsSUFBekMsRUFBK0M7QUFDN0MsUUFBSTtBQUNGLFVBQUlJLE1BQU0sQ0FBQ0UsTUFBUCxLQUFrQixDQUF0QixFQUF5QixNQUFNLElBQUlDLEtBQUosQ0FBVSxzREFBVixDQUFOO0FBQ3pCLFVBQUlILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxDQUFDLElBQUlBLENBQUMsSUFBSUMsU0FBdEIsQ0FBSixFQUFzQyxNQUFNLElBQUlILEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ3RDLFlBQU0sQ0FBQ0ksSUFBRCxFQUFPQyxNQUFQLElBQWlCLE1BQU1QLElBQUksQ0FBQ0gsT0FBTCxDQUFhQyxLQUFiLEVBQW9CQyxNQUFwQixDQUE3QjtBQUNBLGFBQU9TLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxJQUFkLElBQXNCSSxZQUFZLENBQUNKLElBQUQsQ0FBbEMsR0FBMkNBLElBQWxEO0FBQ0QsS0FMRCxDQUtFLE9BQU9LLEtBQVAsRUFBYztBQUNkLFlBQU0sSUFBSUMsVUFBSixDQUFlRCxLQUFmLENBQU47QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7OztBQU9BLFFBQU1iLEtBQU4sQ0FBWUEsS0FBWixFQUFtQkUsSUFBbkIsRUFBeUI7QUFDdkIsUUFBSTtBQUNGLFlBQU1hLFVBQVUsR0FBR2IsSUFBSSxHQUFHQSxJQUFILEdBQVUsS0FBS0wsSUFBdEM7QUFDQSxZQUFNLENBQUNXLElBQUQsRUFBT0MsTUFBUCxJQUFpQixNQUFNTSxVQUFVLENBQUNmLEtBQVgsQ0FBaUJBLEtBQWpCLENBQTdCO0FBQ0EsYUFBT1UsS0FBSyxDQUFDQyxPQUFOLENBQWNILElBQWQsSUFBc0JJLFlBQVksQ0FBQ0osSUFBRCxDQUFsQyxHQUEyQ0EsSUFBbEQ7QUFDRCxLQUpELENBSUUsT0FBT0ssS0FBUCxFQUFjO0FBQ2QsWUFBTSxJQUFJQyxVQUFKLENBQWVELEtBQWYsQ0FBTjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OztBQUtBLFFBQU1HLG1CQUFOLEdBQTRCO0FBQzFCLFFBQUk7QUFDRixhQUFPLE1BQU0sS0FBS25CLElBQUwsQ0FBVW9CLGFBQVYsRUFBYjtBQUNELEtBRkQsQ0FFRSxPQUFPSixLQUFQLEVBQWM7QUFDZCxZQUFNLElBQUlDLFVBQUosQ0FBZUQsS0FBZixDQUFOO0FBQ0Q7QUFDRjs7QUF2RGU7QUEwRGxCOzs7Ozs7Ozs7O0FBT0EsSUFBSUQsWUFBWSxHQUFHSixJQUFJLElBQ3JCQSxJQUFJLENBQUNVLEdBQUwsQ0FBU0MsQ0FBQyxJQUNSQyxJQUFJLENBQUNDLEtBQUwsQ0FDRUQsSUFBSSxDQUFDRSxTQUFMLENBQWVILENBQWYsRUFDR0ksT0FESCxDQUNXLFNBRFgsRUFDc0IsRUFEdEIsRUFFR0EsT0FGSCxDQUVXLFdBRlgsRUFFd0IsRUFGeEIsQ0FERixDQURGLENBREY7QUFTQTs7Ozs7QUFHQSxNQUFNVCxVQUFOLFNBQXlCVixLQUF6QixDQUErQjtBQUM3QlgsRUFBQUEsV0FBVyxDQUFDK0IsWUFBRCxFQUFlO0FBQ3hCLFVBQU1BLFlBQVksQ0FBQ0MsT0FBbkI7QUFDQSxTQUFLQSxPQUFMLEdBQWVELFlBQVksQ0FBQ0MsT0FBNUI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QixDQUFDLGNBQUQsRUFBaUIsb0JBQWpCLEVBQXVDLFdBQXZDLEVBQW9EckIsSUFBcEQsQ0FBeURzQixDQUFDLElBQUlBLENBQUMsSUFBSUgsWUFBWSxDQUFDSSxJQUFoRixDQUF6QjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsR0FBbEI7QUFDRDs7QUFONEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICBEYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBleGVjdXRpbmcgcXVlcmllc1xuICovXG5jb25zdCBCbHVlYmlyZCA9IHJlcXVpcmUoJ2JsdWViaXJkJyksXG4gIG15c3FsID0gcmVxdWlyZSgnbXlzcWwyL3Byb21pc2UnKSxcbiAgcCA9IGNvbnNvbGUubG9nO1xuXG4vKipcbiAqIEBwYXJhbSB7IG9iamVjdCB9IERCX0NPTkZcbiAqIEBwYXJhbSB7IFN0cmluZyB9IHRhZ1xuICogIHNhbXBsZVxuICoge1xuICogICBcImhvc3RcIjogXCJsb2NhbGhvc3RcIixcbiAqICAgXCJ1c2VyXCI6IFwicm9vdFwiLFxuICogICBcInBhc3N3b3JkXCI6IFwicGFzc3dvcmRcIixcbiAqICAgXCJkYXRhYmFzZVwiOiBcInRlc3REQlwiLFxuICogICBcInBvcnRcIjogMzMwNixcbiAqICAgXCJzc2xcIjogZmFsc2UsXG4gKiAgIFwiY29ubmVjdFRpbWVvdXRcIjogNTAwMFxuICogICBcImNvbm5lY3Rpb25MaW1pdFwiOiAxMDBcbiAqIH1cbiAqL1xuY2xhc3MgTXlTcWxDbGllbnQge1xuICBjb25zdHJ1Y3RvcihEQl9DT05GLCB0YWcpIHtcbiAgICBEQl9DT05GLlByb21pc2UgPSBCbHVlYmlyZDtcbiAgICB0aGlzLnBvb2wgPSBteXNxbC5jcmVhdGVQb29sKERCX0NPTkYpO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICB9XG5cbiAgLyoqXG4gICAqIGV4ZWN1dGVzIHF1ZXJpZXMuXG4gICAqIGV4ZWN1dGUgZnVuY3Rpb24gYnVpbGRzIGEgY29tcGxldGUgcXVlcnkgd2l0aCBnaXZlbiBwYXJhbXMuXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHF1ZXJ5XG4gICAqIEBwYXJhbSB7IEFycmF5IH0gcGFyYW1zXG4gICAqIEBwYXJhbSB7IENvbm5lY3Rpb24gfSBjb25uICpvcHRpb25hbFxuICAgKiBAcmV0dXJuIHsgUHJvbWlzZTxBcnJheTwqPj4gfVxuICAgKiBAdGhyb3dzIHsgUHJvbWlzZTxFcnJvcj4gfVxuICAgKi9cbiAgYXN5bmMgZXhlY3V0ZShxdWVyeSwgcGFyYW1zLCBjb25uID0gdGhpcy5wb29sKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ0VtcHR5IFBhcmFtcy4gVXNlIHF1ZXJ5KCkgZm9yIGV4ZWN1dGluZyByYXcgcXVlcmllcy4nKTtcbiAgICAgIGlmIChwYXJhbXMuc29tZShlID0+IGUgPT0gdW5kZWZpbmVkKSkgdGhyb3cgbmV3IEVycm9yKCdQYXJhbXMgY29udGFpbnMgdW5kZWZpbmVkLicpO1xuICAgICAgY29uc3QgW3Jvd3MsIGZpZWxkc10gPSBhd2FpdCBjb25uLmV4ZWN1dGUocXVlcnksIHBhcmFtcyk7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyb3dzKSA/IF9jbGVhblJlc3VsdChyb3dzKSA6IHJvd3M7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBNeVNxbEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZXhlY3V0ZXMgcmF3IHF1ZXJpZXMuXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHF1ZXJ5XG4gICAqIEBwYXJhbSB7IENvbm5lY3Rpb24gfSBjb25uICpvcHRpb25hbFxuICAgKiBAcmV0dXJuIHsgUHJvbWlzZTxBcnJheTwqPj4gfVxuICAgKiBAdGhyb3dzIHsgUHJvbWlzZTxFcnJvcj4gfVxuICAgKi9cbiAgYXN5bmMgcXVlcnkocXVlcnksIGNvbm4pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IGNvbm4gPyBjb25uIDogdGhpcy5wb29sO1xuICAgICAgY29uc3QgW3Jvd3MsIGZpZWxkc10gPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJvd3MpID8gX2NsZWFuUmVzdWx0KHJvd3MpIDogcm93cztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IE15U3FsRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgYSBjb25uZWN0aW9uIGZvciB0cmFuc2FjdGlvblxuICAgKiBETyBOT1QgRk9SR0VUIFRPIFJFTEVBU0UgVEhFIENPTk5FQ1RJT05cbiAgICogQHJldHVybiB7IFByb21pc2U8Q29ubmVjdGlvbj4gfVxuICAgKi9cbiAgYXN5bmMgZ2V0U2luZ2xlQ29ubmVjdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBNeVNxbEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAgZWxpbWluYXRlICdUZXh0Um93JywgJ0JpbmFyeVJvdycgZnJvbSB0aGUgcmVzdWx0IHJvd3MgYW5kIHJldHVybiBvYmplY3QgYXJyYXlcbiAqICBpZiByb3dzIGlzIGVtcHR5LCBpdCByZXR1cm5zIGFuIGVtcHR5IGFycmF5XG4gKiBAcGFyYW0geyBbb2JqZWN0Li4uXSB9IHJvd3NcbiAqIEByZXR1cm4geyBBcnJheTwqPiB9XG4gKi9cblxubGV0IF9jbGVhblJlc3VsdCA9IHJvd3MgPT5cbiAgcm93cy5tYXAociA9PlxuICAgIEpTT04ucGFyc2UoXG4gICAgICBKU09OLnN0cmluZ2lmeShyKVxuICAgICAgICAucmVwbGFjZSgnVGV4dFJvdycsICcnKVxuICAgICAgICAucmVwbGFjZSgnQmluYXJ5Um93JywgJycpXG4gICAgKVxuICApO1xuXG4vKipcbiAqIE15U3FsMiBtb2R1bGUgZXJyb3IgY2xhc3NcbiAqL1xuY2xhc3MgTXlTcWxFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoZXJyb3Jfb2JqZWN0KSB7XG4gICAgc3VwZXIoZXJyb3Jfb2JqZWN0Lm1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IGVycm9yX29iamVjdC5tZXNzYWdlO1xuICAgIHRoaXMuaXNDb25uZWN0aW9uRXJyb3IgPSBbJ0VDT05OUkVGVVNFRCcsICdFUl9IT1NUX0lTX0JMT0NLRUQnLCAnRVRJTUVET1VUJ10uc29tZShjID0+IGMgPT0gZXJyb3Jfb2JqZWN0LmNvZGUpO1xuICAgIHRoaXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgfVxufVxuXG5leHBvcnQgeyBNeVNxbENsaWVudCwgTXlTcWxFcnJvciB9O1xuIl19