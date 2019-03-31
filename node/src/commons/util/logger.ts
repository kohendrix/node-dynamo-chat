/**
 * Common log module with debug.
 * On default, debug module will send logs to stderr.
 * Using log() here will send them to stdout.
 * ref => https://www.npmjs.com/package/debug
 */
import debug from 'debug';

/* output stream */
// stdout
const log = debug('app:log');
log.log = console.log.bind(console);

// stderr
const logE = debug('app:error');

// for debug, pass __filename to initialize
const logD: Function = (filepath: string) => debug('debug:' + filepath.split('/').pop());

export { log, logE, logD };
