import {Router} from "express";
import { getCurrentUser, loginUser, registerUser} from "../controllers/user.controller.js";

const router = Router();

//registeruser
router.route("/register").post(registerUser)
//loginuser
router.route("/login").post(loginUser)
//getallusers
router.route("/all").get(getCurrentUser)



export default router