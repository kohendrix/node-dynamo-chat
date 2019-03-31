/**
 * @route /user
 */
import express from 'express';
import { login, signup } from '../middleware/requestHandlers/index';
const router = express.Router();

// signup
router.post('/signup', signup.postSync);
router.get('/signup', signup.getSync);
// login
router.post('/login', login.postSync);

module.exports = router;
