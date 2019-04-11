/**
 * A session manipulation module.
 * These functions do not care about error handling, so make sure catching them on the upper level.
 */
import { log, logE, logD } from '../../commons/util/logger';
import { UserType } from '../user/User';
import { SessionRequest } from './interfaces/SessionRequest';
const p = logD(__filename);

/**
 * Store login info into the session.
 * @param req
 * @param type
 * @param uuid
 * @returns
 */
function storeSession(req: SessionRequest, type: UserType, uuid: string) {
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
function destroySession(req: SessionRequest, cb: (err?: Error) => void): void {
  req.sessionStore.destroy(req.session.sessionId, err => {
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
function destroySessionSync(req: SessionRequest): Promise<void> {
  return new Promise((res, rej) => {
    req.sessionStore.destroy(req.session.sessionId, err => {
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

export { storeSession, destroySession, destroySessionSync };
