import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async ({ name, email, password }) => {
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw new Error("User already exists");
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPwd
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};
