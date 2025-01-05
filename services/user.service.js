import { v4 as uuidv4 } from 'uuid';
import db from '../utils/db.js';

const createUser = async ({ email, password, activationToken }) => {
  try {
    const id = uuidv4();

    await db.query(
      `
      INSERT INTO users (id, email, password, role, activation_code)
      VALUES ('${id}', '${email}', '${password}', 'user', '${activationToken}')
    `,
    );

    return { email, id };
  } catch (error) {
    console.log(error);
  }
};

const activateUser = async ({ id }) => {
  try {
    await db.query(
      `
      UPDATE users
      SET activation_code = null
      WHERE id = '${id}'
    `,
    );

    return { id };
  } catch (error) {
    console.log(error);
  }
};

const getUserBy = async ({ id = '', email = '', activationLink = '' }) => {
  try {
    const [user] = await db.query(
      `
      SELECT * FROM users
      WHERE id = '${id}'
        OR email = '${email}'
        OR activation_code = '${activationLink}'
    `,
    );

    return user[0];
  } catch (error) {
    console.log(error);
  }
};

export default {
  createUser,
  activateUser,
  getUserBy,
};
