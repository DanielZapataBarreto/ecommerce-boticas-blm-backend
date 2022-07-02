import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    !user &&
      res.status(401).json({
        message: `No se encontró ningún usuario con id: ${id}`,
      });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const updateUser = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'El usuario se ha eliminado' });
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};
