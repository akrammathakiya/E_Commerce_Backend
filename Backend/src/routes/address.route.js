import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controller.js";
import { authenticated } from "../middlewares/auth.middleware.js";


const router = Router();

//add address
router.route("/add").post(authenticated,addAddress);
//get address
router.route("/get").get(authenticated, getAddress);


export default router;
