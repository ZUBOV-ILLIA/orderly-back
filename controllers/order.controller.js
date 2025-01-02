import orderService from '../services/order.service.js';

const get = async (req, res) => {
  try {
    const orders = await orderService.getAll();

    res.json(orders);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getById(id);

    if (!order) {
      res.status(404);
      res.send(`Order with id  ${req.params.id} not found`);
    }

    res.json(order);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  try {
    const order = await orderService.create(req.body);

    res.json(order);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  try {
    await orderService.remove(req.params.id);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default {
  get,
  getOne,
  create,
  remove,
};
