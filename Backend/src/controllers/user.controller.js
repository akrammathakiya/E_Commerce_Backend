import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import JWT from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required for registration.");
  }

  // Check if the user already exists
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists with this email or username.");
  }

  // Create the user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Remove sensitive fields from the user object
  const createdUser = user.toObject(); // Convert Mongoose object to plain JS object
  delete createdUser.password;
  delete createdUser.refreshToken;

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not Find");
  }

  const validPassword = await user.isPasswordCorrect(password);

  if (!validPassword) {
    throw new ApiError(400, "invalid credintial");
  }

const token = JWT.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
});

  return res
    .status(200)
    .json(new ApiResponse(200,token,"user loging successfully."));
});


//get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"));
});




export { registerUser, loginUser, getCurrentUser};
