import { Router } from 'express';
import { productRouter } from '../modules/product/product.routes';
import { OrderRouter } from '../modules/order/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;