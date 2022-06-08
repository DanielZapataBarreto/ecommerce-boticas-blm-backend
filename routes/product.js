import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);

export default router;
