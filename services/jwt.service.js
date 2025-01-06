import jwt from 'jsonwebtoken';
import 'dotenv/config';

const sign = user => {
  const token = jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: 5000,
  });

  return token;
};

const verify = token => {
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export default {
  sign,
  verify,
};
