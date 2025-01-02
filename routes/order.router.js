import express from 'express';
import orderController from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/', orderController.get);
orderRouter.get('/:id', orderController.getOne);
orderRouter.post('/', orderController.create);
orderRouter.delete('/:id', orderController.remove);

export default orderRouter;
