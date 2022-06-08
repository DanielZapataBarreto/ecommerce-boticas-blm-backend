import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

export default mongoose.model('orders', OrderSchema);
