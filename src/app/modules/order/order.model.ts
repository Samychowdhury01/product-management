import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

// inventory schema
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// 3. Create a Model.
export const Order = model<TOrder>('Order', orderSchema);
