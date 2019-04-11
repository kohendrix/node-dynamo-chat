/**
 * Defined in fastify-session.
 * Ref =>
 * https://github.com/SerayaEryn/fastify-session/blob/master/lib/cookie.js
 */
export interface Cookie {
  maxAge: number | null;
  path: string | null;
  httpOnly: boolean;
  secure: boolean;
  expires: Date;
  sameSite: boolean | null;
  domain: string | null;
}
