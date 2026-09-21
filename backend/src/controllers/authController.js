const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const formatUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  province: user.province,
  district: user.district,
  nearestTown: user.nearestTown,
  role: user.role,
  language: user.language,
  theme: user.theme,
});

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, province, district, nearestTown, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'First name, last name, email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const safeRole = role === 'volunteer' ? 'volunteer' : 'citizen';

    const user = await User.create({
      firstName, lastName, email, password, phone,
      province, district, nearestTown,
      role: safeRole,
    });

    res.status(201).json({
      user: formatUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      user: formatUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({ user: formatUser(req.user) });
};

module.exports = { registerUser, loginUser, getMe };