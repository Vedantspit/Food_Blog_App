const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add to favorites
const addFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: recipeId } }, // add only if not exists
      { new: true }
    ).populate("favorites");

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to favorites" });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: recipeId } }, // remove if exists
      { new: true }
    ).populate("favorites");

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from favorites" });
  }
};

// Get all favorites
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favorites");

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

const userSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and pssword required" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const hashPwd = await bcrypt.hash(password, 12);
  const newUser = await User.create({ email, password: hashPwd });

  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
  return res.status(200).json({ token, user: newUser });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  let user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user });
  } else {
    return res.status(400).json({ error: "Invalid Credentials" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "No such user exists" });
    }

    return res.status(200).json({ email: user.email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Invalid user ID", error: error.message });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  getUser,
  addFavorite,
  removeFavorite,
  getFavorites,
};
