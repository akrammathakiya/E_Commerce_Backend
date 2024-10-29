import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add product
const addProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  const product = await Product.create({
    title,
    description,
    price,
    category,
    qty,
    imgSrc,
  });
  if (!product) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, product, "product added successfully.")
    );
});

//get product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find().sort({ createdAt: -1 });
  return res
    .status(201)
    .json(new ApiResponse(200, product, "all product."));
});

//find product by id
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(400, "invalid Id");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, product, "specific product."));
});

//update product by id
const updateProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id,req.body,{new: true});
  if (!product) {
    throw new ApiError(400, "invalid id");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, product, "product has been updated."));
});

//delete product by id
const deleteProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(400, "invalid id");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, product, "product has been deleted."));
});


export { 
  addProduct, 
  getProduct, 
  getProductById, 
  updateProductById, 
  deleteProductById 
}
