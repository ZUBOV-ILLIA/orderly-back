import express from 'express';
import orderController from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/', orderController.get);
orderRouter.get('/:id', orderController.getOne);
orderRouter.post('/create', orderController.create);
orderRouter.get('/products/:id', orderController.getOrderProducts);
orderRouter.post('/add-products/:id', orderController.addProductsToOrder);
orderRouter.post('/remove-products/:id', orderController.removeProducts);
orderRouter.delete('/delete/:id', orderController.remove);

export default orderRouter;
