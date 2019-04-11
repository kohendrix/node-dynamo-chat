import crypto from 'crypto';
import Bluebird from 'bluebird';
import { logD } from '../util/logger';
const p = logD(__filename);

/**
 * Generate random token.
 * If performance is required, use [[generateToken]]
 * @param param
 * @param cb
 * @returns
 */
export function generateToken(
  cb: (err: Error | null, token: string) => void,
  { stringBase = 'hex', byteLength = 48 } = {},
): void {
  try {
    crypto.randomBytes(byteLength, (err, buffer) => {
      try {
        if (err) throw err;

        cb(err, buffer.toString(stringBase));
      } catch (error) {
        cb(error, '');
      }
    });
  } catch (error) {
    cb(error, '');
  }
}

/**
 * Generate random token.
 * If performance is required, use [[generateToken]]
 * @param param
 * @returns
 */
export function generateTokenSync({ stringBase = 'hex', byteLength = 48 } = {}): Bluebird<string> {
  return new Bluebird((res, rej) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      try {
        return err ? rej(err) : res(buffer.toString(stringBase));
      } catch (error) {
        return rej(error);
      }
    });
  });
}
