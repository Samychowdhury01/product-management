import { TProduct } from './product.interface';
import { Product } from './product.model';

// create a new product
const createProductIntoDB = async(product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

// get all product from DB
const getAllProductsFromDB = async() => {
  const result = await Product.find();
  return result;
};

// get a single product using ID from DB
const getSingleProductFromDB = async(id : string) => {
  const result = await Product.findById(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB
};
