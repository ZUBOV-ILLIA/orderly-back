import productService from '../services/product.service.js';
import orderService from '../services/order.service.js';

const get = async (req, res) => {
  try {
    const products = await productService.getAll();

    res.json(products);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    res.json(product);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const getByOrderId = async (req, res) => {
  try {
    const products = await productService.getByOrderId(req.params.orderId);

    res.json(products);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  try {
    const productData = req.body;

    const order = await orderService.getById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const product = await productService.create(
      req.params.orderId,
      productData,
    );

    res.json(product);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  try {
    await productService.remove(req.params.id);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default {
  get,
  getOne,
  getByOrderId,
  create,
  remove,
};
