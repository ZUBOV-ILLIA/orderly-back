import db from '../utils/db.js';

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

export default {
  getAll,
  getById,
  create,
  remove,
};
