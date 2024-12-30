import db from '../utils/db.js';

export const getAll = async () => {
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

export default {
  getAll,
};
