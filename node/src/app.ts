import { log, logE, logD } from './commons/util/logger';
import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ExpressError } from '../src/interfaces/ExpressError';
import { getClient } from './drivers/redis/redisClient';
const RedisStore = connectRedis(session);
const config = require('config');
const p = logD(__filename),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// plugins
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secretkey',
    store: new RedisStore({
      host: config.redis.host,
      port: config.redis.port,
      client: getClient({ host: config.redis.host, port: config.redis.port }),
      prefix: 'sid:',
      ttl: 1800,
    }),
    saveUninitialized: true,
    resave: false,
  }),
);

// routing
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatroom'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: ExpressError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app };
