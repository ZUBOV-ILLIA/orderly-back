import jwtService from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization.split(' ')[1];

  if (!authorization || !token) {
    res.status(401).send('Unauthorized');

    return;
  }

  const user = jwtService.verify(token);

  if (!user) {
    res.status(401).send('Unauthorized');

    return;
  }

  next();
};
