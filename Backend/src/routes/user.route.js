import {Router} from "express";
import { getAllUser, getProfile, loginUser, registerUser} from "../controllers/user.controller.js";
import { authenticated } from "../middlewares/auth.middleware.js";
const router = Router();

//registeruser
router.route("/register").post(registerUser)
//loginuser
router.route("/login").post(loginUser)
//getallusers
router.route("/all").get(getAllUser)
//get user profile
router.route("/profile").get(authenticated,getProfile);


export default router