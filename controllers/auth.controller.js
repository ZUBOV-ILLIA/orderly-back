import { v4 as uuidv4 } from 'uuid';
import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const locale = req.headers['accept-language'];

    const activationToken = uuidv4();

    await userService.createUser({
      email,
      password,
      activationToken,
    });

    authService.sendActivationEmail(email, activationToken, locale);

    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const activate = async (req, res) => {
  try {
    const { activationLink } = req.params;

    const user = await userService.getUserBy({ activationLink });

    if (!user) {
      return res.status(400).send('Wrong activation link');
    }

    await userService.activateUser(user);

    res.send('User activated');
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('Login');
};

export default {
  registration,
  activate,
  login,
};
