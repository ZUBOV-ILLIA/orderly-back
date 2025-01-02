import express from 'express';
import productController from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', productController.get);
productRouter.get('/:id', productController.getOne);
productRouter.get('/by-order/:orderId', productController.getByOrderId);
productRouter.post('/create/:orderId', productController.create);
productRouter.delete('/:id', productController.remove);

export default productRouter;
