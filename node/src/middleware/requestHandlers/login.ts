import express from 'express';
import { log, logE, logD } from '../../commons/util/logger';
import { UserUsecase } from '../../model/user/UserUsecase';
const p = logD(__filename);

export class Login {
  usecase: UserUsecase;
  constructor(usecase: UserUsecase) {
    this.usecase = usecase;
  }

  postSync = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await this.usecase.getBasicUserWithPasswordSync(req.body.email, req.body.password);
    if (user) {
      res.render('home');
    } else {
      res.render('index', { error: 'Invalid login info!' });
    }
    next();
  };

  post = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return;
  };
}
