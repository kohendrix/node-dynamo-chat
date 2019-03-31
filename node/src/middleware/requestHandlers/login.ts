import express from 'express';
import { log, logE, logD } from '../../commons/util/logger';
const p = logD(__filename);

export class Login {
  constructor() {}

  postSync = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    return;
  };
}
