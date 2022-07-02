import Cart from '../models/cart.js';

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id });
    !cart &&
      res.status(401).json({
        message: `No se encontró ningún carrito asociado a un cliente con id: ${id}`,
      });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const updateCart = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'El carrito se ha eliminado' });
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};
