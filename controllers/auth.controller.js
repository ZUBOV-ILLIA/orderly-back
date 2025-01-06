import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';
import jwtService from '../services/jwt.service.js';

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await userService.getUserBy({ email });

    if (isUserExists) {
      return res.send({ success: false, message: 'User already exists' });
    }

    const locale = req.headers['accept-language'];
    const activationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createUser({
      email,
      password: hashedPassword,
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
  try {
    const { email, password } = req.body;

    const user = await userService.getUserBy({ email });

    if (!user) {
      return res.send({ success: false, message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res.status(400).send('Wrong email or password');
    }

    const accessToken = jwtService.sign(user);

    res.send(accessToken);
  } catch (error) {
    console.log(error);
  }
};

export default {
  registration,
  activate,
  login,
};
