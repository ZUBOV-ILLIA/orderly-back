import express from 'express';
import productController from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', productController.get);
productRouter.get('/:id', productController.getOne);
productRouter.post('/by-ids', productController.getMany);
productRouter.post('/create', productController.create);
productRouter.delete('/delete/:id', productController.remove);

export default productRouter;
