const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  editRecipe,
  upload,
} = require("../controller/recipe");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);

// ✅ auth first, then file upload, then controller
router.post("/", verifyToken, upload.single("file"), addRecipe);
router.put("/:id", verifyToken, upload.single("file"), editRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
