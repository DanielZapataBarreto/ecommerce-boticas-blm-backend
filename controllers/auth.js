import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { body } = req;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    password: hashedPassword,
    age: body.age,
    dni: body.dni,
    address: body.address,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });
    !user &&
      res
        .status(401)
        .json(`No se encontró ningún usuario con correo: ${body.email}`);
    const matched = await bcrypt.compare(body.password, user.password);
    !matched && res.status(401).json('Contraseña incorrecta');
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};
