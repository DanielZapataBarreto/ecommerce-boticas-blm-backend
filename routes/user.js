import express from 'express';
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middlewares/verifyToken.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const router = express.Router();

router.get('/', verifyTokenAndAdmin, getAllUsers);
router.get('/:id', verifyTokenAndAdmin, getUser);
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

export default router;
