import { Router } from "express";
import { addToCart, clearCart, decreseProductFromCart, getUserCart, removeProductFromCart } from "../controllers/cart.controller.js";
import { authenticated } from "../middlewares/auth.middleware.js";
const router = Router();


//add to cart
router.route("/add").post(authenticated,addToCart);

//get user cart
router.route("/user").get(authenticated,getUserCart);

//remove from cart
router.route("/remove/:productId").delete(authenticated, removeProductFromCart);

//clear cart
router.route("/clear").delete(authenticated, clearCart);

//decrease qty
router.route("/--qty").post(authenticated, decreseProductFromCart);


export default router;
