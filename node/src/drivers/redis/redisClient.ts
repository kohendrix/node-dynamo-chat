import { log, logE, logD } from '../../commons/util/logger';
import redis, { RedisClient, ClientOpts } from 'redis';
const p = logD(__filename);

/**
 * A thin wrapper for RedisClient.
 * @param options
 */
export function getClient(options: ClientOpts): RedisClient {
  return redis
    .createClient(options)
    .on('error', err => logE(err))
    .on('ready', () => p('redis is ready'))
    .on('connect', () => p('redis is connected'))
    .on('reconnecting', () => p('redis is reconnecting...'))
    .on('end', () => p('redis connection closed'));
}
