import express from 'express';
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken.js';
import {
  getAllCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} from '../controllers/cart.js';

const router = express.Router();

router.get('/', verifyTokenAndAdmin, getAllCarts);
router.get('/:id', verifyTokenAndAuthorization, getCart);
router.post('/', verifyToken, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);

export default router;
