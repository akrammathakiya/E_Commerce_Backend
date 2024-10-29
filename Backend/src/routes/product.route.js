import { Router } from "express";
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from "../controllers/product.controller.js"

const router = Router();

//addproduct
router.route("/add").post(addProduct);
//get all product
router.route("/all").get(getProduct);
//get product byid
router.route("/:id").get(getProductById);
//update product byid
router.route("/:id").put(updateProductById);
//delete product byid
router.route("/:id").delete(deleteProductById);



export default router;
