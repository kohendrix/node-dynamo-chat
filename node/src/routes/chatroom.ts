/**
 * @route /chatroom
 */
import express from 'express';
import { login, signup } from '../middleware/requestHandlers/index';
const router = express.Router();

const _mock = (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  return;
};

// chatroom
router.get('/:roomId', _mock);
router.post('/:roomId', _mock);
router.delete('/:roomId', _mock);

// message
router.post('/:roomId/message', _mock);
router.delete('/:roomId/message', _mock);

module.exports = router;
