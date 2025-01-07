import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';

const getUserBy = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserBy({ id: userId });

    res.json(normalizeUser(user));
  } catch (error) {
    console.log(error);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatar } = req.body;

    const updatedUser = await userService.updateUserAvatar({
      id: userId,
      avatar,
    });

    res.json(normalizeUser(updatedUser));
  } catch (error) {
    console.log(error);
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userService.updateUserPassword({
      id: userId,
      password: hashedPassword,
    });

    res.json(normalizeUser(updatedUser));
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await userService.deleteUser({ id: userId });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

function normalizeUser(user) {
  const { id, email, avatar } = user;

  return { id, email, avatar };
}

export default {
  getUserBy,
  updateUserAvatar,
  updateUserPassword,
  deleteUser,
};
