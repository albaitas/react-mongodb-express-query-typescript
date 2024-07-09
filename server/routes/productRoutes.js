import express from 'express';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);

export default router;
