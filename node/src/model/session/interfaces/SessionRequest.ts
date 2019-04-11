import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';
import { FastifySession } from './FastifySession';
import { Http2ServerRequest } from 'http2';
import { RedisStore } from 'connect-redis';

/**
 * For session property, since it is not supported in the typings.
 */
export interface SessionRequest extends FastifyRequest<IncomingMessage> {
  session: FastifySession;
  sessionStore: RedisStore;
}

/**
 * Typeguard for SessionRequest.
 * @param obj
 */
export const isSessionRequest = (obj: any): obj is SessionRequest => (<SessionRequest>obj).session !== undefined;
