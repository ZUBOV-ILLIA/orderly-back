import db from '../utils/db.js';
import productService from './product.service.js';

const getAll = async () => {
  try {
    const [orders] = await db.query(`
      SELECT *
      FROM orders
    `);

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Could not fetch products');
  }
};

const getById = async id => {
  console.log('>>>', id);

  try {
    const [orders] = await db.query(
      `
      SELECT *
      FROM orders
      WHERE id = ?
    `,
      [id],
    );

    if (!orders.length) {
      return;
    }

    return {
      ...orders[0],
    };
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw new Error('Could not fetch order by ID');
  }
};

const create = async orderData => {
  try {
    orderData.date = new Date();

    const [result] = await db.query(
      `
      INSERT INTO orders (title, date, description)
      VALUES (?, ?, ?)
    `,
      [orderData.title, orderData.date, orderData.description],
    );

    const orderId = result.insertId;

    return {
      id: orderId,
      ...orderData,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Could not create order');
  }
};

const remove = async id => {
  await db.query(
    `
    DELETE FROM orders
    WHERE id = ?
  `,
    [id],
  );
};

const getOrderProducts = async orderId => {
  try {
    const productsIds = await db.query(
      `
      SELECT product_id
      FROM order_products
      WHERE order_id = ?
    `,
      [orderId],
    );

    const preparedProductsIds = productsIds[0].map(
      product => product.product_id,
    );

    return await productService.getMany(preparedProductsIds);
  } catch (error) {
    console.error('Error fetching order products:', error);
    throw new Error('Could not fetch order products');
  }
};

const addProductsToOrder = async (orderId, productsIds) => {
  try {
    const result = await db.query(
      `
      INSERT INTO order_products (order_id, product_id)
      VALUES ?
    `,
      [productsIds.map(productId => [orderId, productId])],
    );

    return result.insertId;
  } catch (error) {
    console.error('Error creating order products:', error);
    throw new Error('Could not create order products');
  }
};

const removeProducts = async (orderId, productsIds) => {
  try {
    await db.query(
      `
      DELETE FROM order_products
      WHERE order_id = ? AND product_id IN (?)
    `,
      [orderId, productsIds],
    );
  } catch (error) {
    console.error('Error removing order products:', error);
    throw new Error('Could not remove order products');
  }
};

export default {
  getAll,
  getById,
  create,
  remove,
  getOrderProducts,
  addProductsToOrder,
  removeProducts,
};
