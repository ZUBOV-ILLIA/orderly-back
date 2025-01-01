import db from '../utils/db.js';

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

    return products.map(product => {
      const pPrice = prices.filter(price => price.product_id === product.id);
      const resultPrices = pPrice.map(price => ({
        value: price.value,
        symbol: price.symbol,
        isDefault: price.isDefault,
      }));

      return {
        ...product,
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

    const resultPrices = prices.map(price => ({
      value: price.value,
      symbol: price.symbol,
      isDefault: price.isDefault,
    }));

    return {
      ...products[0],
      prices: resultPrices,
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Could not fetch product by ID');
  }
};

const create = async productData => {
  try {
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
      INSERT INTO products (serialNumber, isNew, photo, title, type, specification, guarantee_start, guarantee_end, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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

const createProductPrices = async (productId, prices) => {
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
};

export default {
  getAll,
  getById,
  create,
  remove,
};
