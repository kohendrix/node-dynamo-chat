import { log, logE, logD } from '../../commons/util/logger';
import { DynamoClient } from './DynamoClient';
import { ConfigSchema } from '../../interfaces/ConfigSchema';
const config: ConfigSchema = require('config');
const p = logD(__filename);

/**
 * Provider of DynamoClient.
 * @param instance
 */
export function getDynamoClient(): DynamoClient {
  const endpoint = config.aws.endpoint;
  const conf = {
    sslEnabled: config.aws.sslEnabled,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
    endpoint,
  };

  const dax = config.aws.dax.endpoints.length
    ? { endpoints: config.aws.dax.endpoints, region: config.aws.region }
    : undefined;

  return new DynamoClient(conf, dax);
}
