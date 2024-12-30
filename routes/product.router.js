import express from 'express';
import productController from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', productController.get);

export default productRouter;
