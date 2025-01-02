import db from '../utils/db.js';
import { getCurrencyRateToUAH } from '../utils/helpers.js';

const currencyRateToUAH = await getCurrencyRateToUAH();
const guarantyPeriod = 2;

const getAll = async () => {
  try {
    const [products] = await db.query(`
      SELECT *
      FROM products
    `);
    const [prices] = await db.query(`
      SELECT *
      FROM prices
    `);
    const [orders] = await db.query(`
      SELECT *
      FROM orders
    `);

    return products.map(product => {
      const pPrice = prices.filter(price => price.product_id === product.id);
      const resultPrices = pPrice.map(price => ({
        value: price.value,
        symbol: price.symbol,
        isDefault: price.isDefault,
      }));

      return {
        ...product,
        order: orders.find(order => order.id === product.order_id),
        prices: resultPrices,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products');
  }
};

const getById = async id => {
  try {
    const [products] = await db.query(
      `
      SELECT *
      FROM products
      WHERE id = ?
    `,
      [id],
    );
    const [prices] = await db.query(
      `
      SELECT *
      FROM prices
      WHERE product_id = ?
    `,
      [id],
    );
    const [order] = await db.query(
      `
      SELECT *
      FROM orders
      WHERE id = ?
    `,
      [products[0].order_id],
    );

    const resultPrices = prices.map(price => ({
      value: price.value,
      symbol: price.symbol,
      isDefault: price.isDefault,
    }));

    return {
      ...products[0],
      order: order[0],
      prices: resultPrices,
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Could not fetch product by ID');
  }
};

const getByOrderId = async orderId => {
  try {
    const [products] = await db.query(
      `
      SELECT *
      FROM products
      WHERE order_id = ?
    `,
      [orderId],
    );
    const productIds = products.map(product => product.id);
    const [prices] = await db.query(
      `
      SELECT *
      FROM prices
      WHERE product_id IN (?)
    `,
      [productIds],
    );
    const [order] = await db.query(
      `
      SELECT *
      FROM orders
      WHERE id = ?
    `,
      [orderId],
    );

    return products.map(product => {
      const pPrice = prices.filter(price => price.product_id === product.id);
      const resultPrices = pPrice.map(price => ({
        value: price.value,
        symbol: price.symbol,
        isDefault: price.isDefault,
      }));

      return {
        ...product,
        order: order[0],
        prices: resultPrices,
      };
    });
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    throw new Error('Could not fetch products by IDs');
  }
};

const create = async (orderId, productData) => {
  try {
    productData.date = new Date();
    productData.guarantee_start = productData.date;
    productData.guarantee_end = new Date(productData.date);
    productData.guarantee_end.setFullYear(
      productData.guarantee_end.getFullYear() + guarantyPeriod,
    );

    productData.prices = [
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

    const {
      serialNumber,
      isNew,
      photo,
      title,
      type,
      specification,
      guarantee_start,
      guarantee_end,
      date,
      prices,
    } = productData;

    const [result] = await db.query(
      `
      INSERT INTO products (serialNumber, isNew, photo, title, type, specification, guarantee_start, guarantee_end, order_id, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        serialNumber,
        isNew,
        photo,
        title,
        type,
        specification,
        guarantee_start,
        guarantee_end,
        orderId,
        date,
      ],
    );

    const productId = result.insertId;

    await createProductPrices(productId, prices);

    return {
      id: productId,
      serialNumber,
      isNew,
      photo,
      title,
      type,
      specification,
      guarantee_start,
      guarantee_end,
      orderId,
      date,
      prices,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Could not create product');
  }
};

const remove = async id => {
  await db.query(
    `
    DELETE FROM products
    WHERE id = ?
  `,
    [id],
  );
};

async function createProductPrices(productId, prices) {
  try {
    const result = await db.query(
      `
      INSERT INTO prices (product_id, value, symbol, isDefault)
      VALUES ?
    `,
      [
        prices.map(price => [
          productId,
          price.value,
          price.symbol,
          price.isDefault,
        ]),
      ],
    );

    return result.insertId;
  } catch (error) {
    console.error('Error creating prices:', error);
    throw new Error('Could not create prices');
  }
}

export default {
  getAll,
  getById,
  getByOrderId,
  create,
  remove,
};
