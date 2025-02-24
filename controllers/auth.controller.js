import User from '../models/auth.model.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['Email is already in use']);

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);

    return res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      password: userSaved.password,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) res.status(400).json({ message: 'User not Found' });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) res.status(400).json({ message: 'Incorrect Password' });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    password: userFound.password,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    const userFound = User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized ' });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
