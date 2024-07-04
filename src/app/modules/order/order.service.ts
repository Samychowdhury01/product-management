/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// create a new product
const createOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.productId);
  if (!product) {
    throw new Error('Product not found');
  } else if (
    product?.inventory.quantity < order.quantity ||
    product?.inventory.quantity === 0
  ) {
    throw new Error('Insufficient quantity available in inventory');
  } else {
    const newQuantity = product.inventory.quantity - order.quantity;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: order.productId },
      {
        $set: {
          'inventory.quantity': newQuantity,
        },
      },
      { new: true },
    );
    if (updatedProduct?.inventory.quantity === 0) {
      await Product.findByIdAndUpdate(
        { _id: order.productId },
        {
          $set: {
            'inventory.inStock': false,
          },
        },
        { new: true },
      );
    }

    const newOrder = await Order.create(order);
    return newOrder;
  }
};

export const OrderServices = {
  createOrderIntoDB,
};
