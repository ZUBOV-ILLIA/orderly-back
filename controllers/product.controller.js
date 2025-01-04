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
    const product = await productService.getById(req.params.id);

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

const getByType = async (req, res) => {
  try {
    const product = await productService.getByType(req.params.type);

    res.json(product);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const getAllTypes = async (req, res) => {
  try {
    const types = await productService.getAllTypes();

    res.json(types);
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
  getByType,
  getAllTypes,
  create,
  remove,
};
