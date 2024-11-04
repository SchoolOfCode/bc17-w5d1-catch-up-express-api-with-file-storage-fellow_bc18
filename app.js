import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/recipes", async (req, res) => {
  const recipes = await getRecipes();
  res.json({ success: true, payload: recipes });
});

app.get("/api/recipes/:id", async (req, res) => {
  const recipe = await getRecipeByID(req.params.id);
  if (recipe && Object.keys(recipe).length > 0) {
    res.json({ success: true, payload: recipe });
  } else {
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

app.post("/api/recipes", (req, res) => {
  const newRecipe = createRecipe(req.body);
  res.status(201).json({ success: true, payload: newRecipe });
});

app.patch("/api/recipes/:id", (req, res) => {
  const updatedRecipe = updateRecipeByID(req.params.id, req.body);
  if (updatedRecipe) {
    res.json({ success: true, payload: updatedRecipe });
  } else {
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

app.delete("/api/recipes/:id", (req, res) => {
  const deletedRecipe = deleteRecipeByID(req.params.id);
  if (deletedRecipe) {
    res.json({ success: true, payload: deletedRecipe });
  } else {
    res.status(404).json({ success: false, message: "Recipe not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});