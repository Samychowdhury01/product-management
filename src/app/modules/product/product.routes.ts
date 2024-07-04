import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router()

router.post('/', ProductControllers.createProduct)
router.get('/', ProductControllers.getAllProducts)

export const productRouter = router