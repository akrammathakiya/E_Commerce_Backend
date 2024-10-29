import { Address } from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addAddress = asyncHandler(async(req,res)=>{
    const {fullName, address, city, state, country, pincode, phoneNumber } = req.body
    let userId = req.user;

    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
});
    return res
    .status(201)
    .json(new ApiResponse(200, userAddress, "address added"));
});

const getAddress = asyncHandler(async(req,res)=>{
  let userId = req.user;
  let address = await Address.find({userId}).sort({createdAt:-1})
  let userAddress = address[0];
    return res
      .status(201)
      .json(new ApiResponse(200, userAddress,"address"));  
})

export {
  addAddress,
  getAddress,
}