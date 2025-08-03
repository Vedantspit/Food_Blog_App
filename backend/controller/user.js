const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = { userSignUp, userLogin, getUser };
