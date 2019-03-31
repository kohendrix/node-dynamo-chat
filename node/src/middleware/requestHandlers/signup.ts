import express from 'express';
import { log, logE, logD } from '../../commons/util/logger';
const p = logD(__filename);

export class Signup {
  constructor() {}

  getSync = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    res.render('signup');
    return;
  };

  postSync = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    res.send({ message: 'signup' });
    return;
  };
}
