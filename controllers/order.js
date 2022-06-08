import Order from '../models/order.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id });
    !orders &&
      res.status(401).send({
        message: `No se encontró ninguna orden asociada a un cliente con id: ${id}`,
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).send({ message: 'La orden se ha eliminado' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
