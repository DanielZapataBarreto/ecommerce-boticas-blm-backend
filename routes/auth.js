import express from 'express';
import { register, login, autoLogin } from '../controllers/auth.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/autologin', verifyToken, autoLogin);

export default router;
