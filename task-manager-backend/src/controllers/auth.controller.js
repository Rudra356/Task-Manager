import { registerUser, loginUser } from "../services/auth.service.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const createdUser = await registerUser(req.body);
    return res.status(201).json(createdUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const authToken = await loginUser(req.body);
    res.json({ token: authToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// fetch logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.userId).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: "Unable to get profile right now" });
  }
};
