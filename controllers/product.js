import Product from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    !product &&
      res.status(401).json(`No se encontró ningún producto con id: ${id}`);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const updateProduct = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'El producto se ha eliminado' });
  } catch (error) {
    res.status(500).json(`${error.message}`);
  }
};
