const Recipes = require("../models/recipe");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// 🔹 Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// 🔹 Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "recipes", // all uploads go into a "recipes" folder
    allowed_formats: ["jpg", "jpeg", "png"], // restrict file types
  },
});

const upload = multer({ storage });

/**
 * @desc   Get all recipes
 */
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/**
 * @desc   Get a single recipe
 */
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/**
 * @desc   Add new recipe
 */
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      time,
      coverImage: req.file?.path || null, // Cloudinary gives secure URL
      createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc   Edit recipe
 */
const editRecipe = async (req, res) => {
  try {
    let recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    let coverImg = req.file?.path ? req.file.path : recipe.coverImage;

    recipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ingredients: req.body.ingredients?.split(",").map((i) => i.trim()),
        coverImage: coverImg,
      },
      { new: true }
    );

    res.json(recipe);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};

/**
 * @desc   Delete recipe
 */
const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting recipe", error: err.message });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipe,
  upload,
};
