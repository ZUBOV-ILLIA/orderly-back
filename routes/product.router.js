import express from 'express';
import productController from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', productController.get);
productRouter.get('/id/:id', productController.getOne);
productRouter.get('/by-order/:orderId', productController.getByOrderId);
productRouter.get('/by-type/:type', productController.getByType);
productRouter.get('/types', productController.getAllTypes);
productRouter.post('/create/:orderId', productController.create);
productRouter.delete('/:id', productController.remove);

export default productRouter;
