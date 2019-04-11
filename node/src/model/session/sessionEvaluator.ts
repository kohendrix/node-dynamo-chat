import { log, logE, logD } from '../../commons/util/logger';
import { UserType } from '../user/User';
import { FastifySession } from './interfaces/FastifySession';
const p = logD(__filename);

/**
 * For now, just checking the uuid, but maybe add some params to check later.
 * If the session login status is valid, returns true.
 * @param session
 * @return
 */
export function evaluateSession(session: FastifySession): boolean {
  // p('session', session);
  switch (session.type) {
    case UserType.Basic:
      return _isBasicValid(session);
    case UserType.Google:
      return _isGoogleValid(session);
    case undefined:
      return false;
    default:
      throw TypeError(`Invalid Argument for UserType -> ${session.type}`);
  }
}

/**
 * At this moment there is nothing really to check.
 * @param session
 */
function _isBasicValid(session: FastifySession): boolean {
  return session.uuid !== undefined;
}

/**
 * At this moment there is nothing really to check.
 * @param session
 */
function _isGoogleValid(session: FastifySession): boolean {
  return session.uuid !== undefined;
}
