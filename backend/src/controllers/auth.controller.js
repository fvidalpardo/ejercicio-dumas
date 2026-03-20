import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken, validateEmail, catchAsync } from "../lib/utils.js";

export const signup = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body;
  // Validations
  if (!fullName || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  if (!validateEmail(email)) {
    const error = new Error("Invalid email format, ex: example@example.com");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("This email already exists");
    error.statusCode = 400;
    throw error;
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    // * JWT creation *
    generateToken(newUser._id, res);

    await newUser.save();

    // Success
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } else {
    const error = new Error("Invalid user data");
    error.statusCode = 400;
    throw error;
  }
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  // ? Does user exists?
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 404;
    throw error;
  }

  // Verify passwords
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Invalid credentials");
    error.statusCode = 404;
    throw error;
  }

  generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
  });
});

export const logout = (req, res) => {
  // Clear cookie
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// Controller created to check if it's still logged in after manual refresh
export const checkAuth = (req, res, next) => {
  if (!req.user) {
    const error = new Error("User not authenticated");
    error.statusCode = 401;
    return next(error);
  }

  res.status(200).json(req.user);
};
