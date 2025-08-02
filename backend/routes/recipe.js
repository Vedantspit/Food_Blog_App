const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  editRecipe,
} = require("../controller/recipe");
// const

const router = express.Router();
// router.get("/", (req, res) => {
//   res.send("All recipes");
// });
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", addRecipe);

router.put("/:id", editRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
