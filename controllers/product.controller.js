import productService from '../services/product.service.js';
import { getCurrencyRateToUAH } from '../utils/helpers.js';

const currencyRateToUAH = await getCurrencyRateToUAH();
const guarantyPeriod = 2;

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

const getMany = async (req, res) => {
  try {
    const products = await productService.getMany(req.body);

    res.json(products);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  try {
    const productData = req.body;

    productData.date = new Date();
    productData.guarantee_start = productData.date;
    productData.guarantee_end = new Date(productData.date);
    productData.guarantee_end.setFullYear(
      productData.guarantee_end.getFullYear() + guarantyPeriod,
    );

    const prices = [
      {
        value: productData.price,
        symbol: 'UAH',
        isDefault: productData.priceIsDefault ? 1 : 0,
      },
      {
        value: (productData.price * currencyRateToUAH.uah.usd).toFixed(2),
        symbol: 'USD',
        isDefault: productData.priceIsDefault ? 0 : 1,
      },
    ];

    productData.prices = prices;

    const product = await productService.create(productData, prices);

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
  getMany,
  create,
  remove,
};
