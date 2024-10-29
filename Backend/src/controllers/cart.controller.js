import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/Cart.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add product to addtocart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (items) => items.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  return res
    .status(201)
    .json(new ApiResponse(200, cart, "item add to cart successfully"));
});

//get user cart
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(400, "cart not found");
  }
  return res.status(201).json(new ApiResponse(200, cart, "user cart"));
});

// remove product from cart
const removeProductFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Product removed from cart"));
});

// clear cart
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ items: [] });
  }
  cart.items = [];

  await cart.save();

  return res.status(200).json(new ApiResponse(200, "cart cleared"));
});

//decrese product from add to cart
const decreseProductFromCart = asyncHandler(async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (items) => items.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if (item.qty > qty ) {
      const pricePerUnit = item.price/item.qty;

      item.qty -= qty
      item.price -= pricePerUnit/item.qty
    }else{
      cart.items.splice(itemIndex,1)
    }
  } else {
    throw new ApiError(400,"invalid product id")
  }

  await cart.save();
  return res
    .status(201)
    .json(new ApiResponse(200, cart, "item qty decreased"));
});

export { addToCart, getUserCart, removeProductFromCart, clearCart, decreseProductFromCart, };
