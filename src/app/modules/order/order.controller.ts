import { NextFunction, Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const validateOrder = await orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderIntoDB(validateOrder)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
        success: false,
        message: error.message || "Insufficient quantity available in inventory",

      });
  }
};

export const OrderControllers = {
  createOrder,
};
