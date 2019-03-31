import express from 'express';
import { log, logE, logD } from '../../commons/util/logger';
const p = logD(__filename);

export class Top {
  constructor() {}

  getSync = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    res.render('index');
    return;
  };
}
