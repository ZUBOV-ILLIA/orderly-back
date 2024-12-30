import productService from '../services/product.service.js';

const get = async (req, res) => {
  try {
    const products = await productService.getAll();

    res.json(products);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default {
  get,
};
