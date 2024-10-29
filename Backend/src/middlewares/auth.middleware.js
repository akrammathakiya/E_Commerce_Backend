import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const authenticated = asyncHandler(async(req,res,next)=>{
  const token = req.header("Auth")
  if (!token) {
    throw new ApiError(404,"login first")
  }
  const decoded = JWT.verify(token,process.env.REFRESH_TOKEN_SECRET)
  const id = decoded.userId
  let user = await User.findById(id)
  if (!user) {
     return res
       .status(400)
       .json(
         new ApiResponse(
           400,
           "user not registerd"
         )
       );
  }
  req.user = user
  next()

})
