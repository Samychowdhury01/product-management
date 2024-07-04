/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// create a new product
const createOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (
    product?.inventory.quantity < order.quantity ||
    product?.inventory.quantity === 0
  ) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const update = {
    $inc: { 'inventory.quantity': -order.quantity },
    $set: {
      'inventory.inStock':
      product.inventory.quantity - order.quantity !== 0

    },
  };

  await Product.findByIdAndUpdate(order.productId, update, { new: true });

  const newOrder = await Order.create(order);
  return newOrder;
};

export const OrderServices = {
  createOrderIntoDB,
};
