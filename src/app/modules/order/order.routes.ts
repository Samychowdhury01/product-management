import { Router } from "express";
import { OrderControllers } from "./order.controller";

const router = Router()

router.post('/', OrderControllers.createOrder)
// router.get('/', )
// router.get('/:productId',)
// router.put('/:productId', )
// router.delete('/:productId',)


export const OrderRouter = router