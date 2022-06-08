import express from 'express';
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken.js';
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order.js';

const router = express.Router();

router.get('/', verifyTokenAndAdmin, getAllOrders);
router.get('/:id', verifyTokenAndAuthorization, getOrder);
router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

export default router;
