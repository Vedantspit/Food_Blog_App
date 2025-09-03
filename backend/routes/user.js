const express = require("express");

const router = express.Router();
const {
  userLogin,
  userSignUp,
  getUser,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controller/user");
router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

// Add recipe to favorites
router.post("/:userId/favorites/:recipeId", addFavorite);

// Remove recipe from favorites
router.delete("/:userId/favorites/:recipeId", removeFavorite);

// Get all favorites for a user
router.get("/:userId/favorites", getFavorites);

module.exports = router;
