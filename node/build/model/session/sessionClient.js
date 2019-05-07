"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeSession = storeSession;
exports.destroySession = destroySession;
exports.destroySessionSync = destroySessionSync;

var _logger = require("../../commons/util/logger");

/**
 * A session manipulation module.
 * These functions do not care about error handling, so make sure catching them on the upper level.
 */
const p = (0, _logger.logD)(__filename);
/**
 * Store login info into the session.
 * @param req
 * @param type
 * @param uuid
 * @returns
 */

function storeSession(req, type, uuid) {
  req.session.type = type;
  req.session.uuid = uuid;
  p('session stored');
}
/**
 * Reset the session.
 * @param req
 * @param cb
 * @returns
 */


function destroySession(req, cb) {
  req.session.destroy(err => {
    if (err) {
      return cb(err);
    } else {
      delete req.session.sessionId;
      delete req.session.type;
      delete req.session.uuid;
      p('session destroyed');
      return cb();
    }
  });
}
/**
 * Reset the session.
 * @param req
 * @returns
 */


function destroySessionSync(req) {
  return new Promise((res, rej) => {
    req.session.destroy(err => {
      if (err) {
        return rej(err);
      } else {
        delete req.session.sessionId;
        delete req.session.type;
        delete req.session.uuid;
        p('session destroyed');
        return res();
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9zZXNzaW9uL3Nlc3Npb25DbGllbnQudHMiXSwibmFtZXMiOlsicCIsIl9fZmlsZW5hbWUiLCJzdG9yZVNlc3Npb24iLCJyZXEiLCJ0eXBlIiwidXVpZCIsInNlc3Npb24iLCJkZXN0cm95U2Vzc2lvbiIsImNiIiwiZGVzdHJveSIsImVyciIsInNlc3Npb25JZCIsImRlc3Ryb3lTZXNzaW9uU3luYyIsIlByb21pc2UiLCJyZXMiLCJyZWoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBOztBQUpBOzs7O0FBTUEsTUFBTUEsQ0FBQyxHQUFHLGtCQUFLQyxVQUFMLENBQVY7QUFFQTs7Ozs7Ozs7QUFPQSxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUE0Q0MsSUFBNUMsRUFBNERDLElBQTVELEVBQTBFO0FBQ3hFRixFQUFBQSxHQUFHLENBQUNHLE9BQUosQ0FBWUYsSUFBWixHQUFtQkEsSUFBbkI7QUFDQUQsRUFBQUEsR0FBRyxDQUFDRyxPQUFKLENBQVlELElBQVosR0FBbUJBLElBQW5CO0FBQ0FMLEVBQUFBLENBQUMsQ0FBQyxnQkFBRCxDQUFEO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTTyxjQUFULENBQXdCSixHQUF4QixFQUE4Q0ssRUFBOUMsRUFBK0U7QUFDN0VMLEVBQUFBLEdBQUcsQ0FBQ0csT0FBSixDQUFZRyxPQUFaLENBQW9CQyxHQUFHLElBQUk7QUFDekIsUUFBSUEsR0FBSixFQUFTO0FBQ1AsYUFBT0YsRUFBRSxDQUFDRSxHQUFELENBQVQ7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPUCxHQUFHLENBQUNHLE9BQUosQ0FBWUssU0FBbkI7QUFDQSxhQUFPUixHQUFHLENBQUNHLE9BQUosQ0FBWUYsSUFBbkI7QUFDQSxhQUFPRCxHQUFHLENBQUNHLE9BQUosQ0FBWUQsSUFBbkI7QUFDQUwsTUFBQUEsQ0FBQyxDQUFDLG1CQUFELENBQUQ7QUFDQSxhQUFPUSxFQUFFLEVBQVQ7QUFDRDtBQUNGLEdBVkQ7QUFXRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU0ksa0JBQVQsQ0FBNEJULEdBQTVCLEVBQWlFO0FBQy9ELFNBQU8sSUFBSVUsT0FBSixDQUFZLENBQUNDLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBQy9CWixJQUFBQSxHQUFHLENBQUNHLE9BQUosQ0FBWUcsT0FBWixDQUFvQkMsR0FBRyxJQUFJO0FBQ3pCLFVBQUlBLEdBQUosRUFBUztBQUNQLGVBQU9LLEdBQUcsQ0FBQ0wsR0FBRCxDQUFWO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBT1AsR0FBRyxDQUFDRyxPQUFKLENBQVlLLFNBQW5CO0FBQ0EsZUFBT1IsR0FBRyxDQUFDRyxPQUFKLENBQVlGLElBQW5CO0FBQ0EsZUFBT0QsR0FBRyxDQUFDRyxPQUFKLENBQVlELElBQW5CO0FBQ0FMLFFBQUFBLENBQUMsQ0FBQyxtQkFBRCxDQUFEO0FBQ0EsZUFBT2MsR0FBRyxFQUFWO0FBQ0Q7QUFDRixLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgc2Vzc2lvbiBtYW5pcHVsYXRpb24gbW9kdWxlLlxuICogVGhlc2UgZnVuY3Rpb25zIGRvIG5vdCBjYXJlIGFib3V0IGVycm9yIGhhbmRsaW5nLCBzbyBtYWtlIHN1cmUgY2F0Y2hpbmcgdGhlbSBvbiB0aGUgdXBwZXIgbGV2ZWwuXG4gKi9cbmltcG9ydCB7IGxvZywgbG9nRSwgbG9nRCB9IGZyb20gJy4uLy4uL2NvbW1vbnMvdXRpbC9sb2dnZXInO1xuaW1wb3J0IHsgVXNlclR5cGUgfSBmcm9tICcuLi91c2VyL1VzZXInO1xuY29uc3QgcCA9IGxvZ0QoX19maWxlbmFtZSk7XG5cbi8qKlxuICogU3RvcmUgbG9naW4gaW5mbyBpbnRvIHRoZSBzZXNzaW9uLlxuICogQHBhcmFtIHJlcVxuICogQHBhcmFtIHR5cGVcbiAqIEBwYXJhbSB1dWlkXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBzdG9yZVNlc3Npb24ocmVxOiBFeHByZXNzLlJlcXVlc3QsIHR5cGU6IFVzZXJUeXBlLCB1dWlkOiBzdHJpbmcpIHtcbiAgcmVxLnNlc3Npb24udHlwZSA9IHR5cGU7XG4gIHJlcS5zZXNzaW9uLnV1aWQgPSB1dWlkO1xuICBwKCdzZXNzaW9uIHN0b3JlZCcpO1xufVxuXG4vKipcbiAqIFJlc2V0IHRoZSBzZXNzaW9uLlxuICogQHBhcmFtIHJlcVxuICogQHBhcmFtIGNiXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBkZXN0cm95U2Vzc2lvbihyZXE6IEV4cHJlc3MuUmVxdWVzdCwgY2I6IChlcnI/OiBFcnJvcikgPT4gdm9pZCk6IHZvaWQge1xuICByZXEuc2Vzc2lvbi5kZXN0cm95KGVyciA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSByZXEuc2Vzc2lvbi5zZXNzaW9uSWQ7XG4gICAgICBkZWxldGUgcmVxLnNlc3Npb24udHlwZTtcbiAgICAgIGRlbGV0ZSByZXEuc2Vzc2lvbi51dWlkO1xuICAgICAgcCgnc2Vzc2lvbiBkZXN0cm95ZWQnKTtcbiAgICAgIHJldHVybiBjYigpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogUmVzZXQgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gcmVxXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBkZXN0cm95U2Vzc2lvblN5bmMocmVxOiBFeHByZXNzLlJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIHJlcS5zZXNzaW9uLmRlc3Ryb3koZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlaihlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHJlcS5zZXNzaW9uLnNlc3Npb25JZDtcbiAgICAgICAgZGVsZXRlIHJlcS5zZXNzaW9uLnR5cGU7XG4gICAgICAgIGRlbGV0ZSByZXEuc2Vzc2lvbi51dWlkO1xuICAgICAgICBwKCdzZXNzaW9uIGRlc3Ryb3llZCcpO1xuICAgICAgICByZXR1cm4gcmVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBzdG9yZVNlc3Npb24sIGRlc3Ryb3lTZXNzaW9uLCBkZXN0cm95U2Vzc2lvblN5bmMgfTtcbiJdfQ==