import { Cookie } from './Cookie';
/**
 * Typing for fastify-session.
 * Ref =>
 * https://github.com/SerayaEryn/fastify-session/blob/master/lib/session.js
 */
export interface FastifySession {
  sessionId: string;
  type: number | undefined; // custom
  uuid: string | undefined; // custom
  expires: Date | null;
  cookie: Cookie;
  [key: string]: any;
}
