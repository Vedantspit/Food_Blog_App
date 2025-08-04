const Recipes = require("../models/recipe");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // Get file extension
    const filename = Date.now() + "-" + file.fieldname + "." + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();

  res.json(recipes);
};

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  console.log("Im in add Recipe Function", req.user);

  // console.log("req.body:", req.body);
  // console.log("req.file:", req.file);

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy: req.user.id,
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipes.findById(req.params.id);
  try {
    if (recipe) {
      await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ title, ingredients, instructions, time });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};

const deleteRecipe = (req, res) => {
  res.json({ message: "Hello" });
};

module.exports = {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipe,
  upload,
};
