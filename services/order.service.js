import db from '../utils/db.js';

const getAll = async () => {
  try {
    const [orders] = await db.query(`
      SELECT *
      FROM orders
    `);

    for (const order of orders) {
      const [products] = await db.query(
        `
          SELECT COUNT(*) AS count,
                 SUM(CASE WHEN prices.symbol = 'UAH' THEN prices.value ELSE 0 END) AS priceUAH,
                 SUM(CASE WHEN prices.symbol = 'USD' THEN prices.value ELSE 0 END) AS priceUSD
          FROM products
                   LEFT JOIN prices ON products.id = prices.product_id
          WHERE products.order_id = ?
      `,
        [order.id],
      );

      order.productsCount = products[0].count;
      order.priceUAH = products[0].priceUAH;
      order.priceUSD = products[0].priceUSD;
    }

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

    const [products] = await db.query(
      `
          SELECT COUNT(*) AS count,
                 SUM(CASE WHEN prices.symbol = 'UAH' THEN prices.value ELSE 0 END) AS priceUAH,
                 SUM(CASE WHEN prices.symbol = 'USD' THEN prices.value ELSE 0 END) AS priceUSD
          FROM products
                   LEFT JOIN prices ON products.id = prices.product_id
          WHERE products.order_id = ?
      `,
      [id],
    );

    orders[0].productsCount = products[0].count;
    orders[0].priceUAH = products[0].priceUAH;
    orders[0].priceUSD = products[0].priceUSD;

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
