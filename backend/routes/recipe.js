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
// router.get("/", (req, res) => {
//   res.send("All recipes");
// });
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", upload.single("file"), verifyToken, addRecipe);

router.put("/:id", upload.single("file"), editRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
