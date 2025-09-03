import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function EditRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    file: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/recipe/${id}`)
        .then((response) => {
          let res = response.data;
          setRecipeData({
            title: res.title,
            ingredients: res.ingredients.join(","),
            instructions: res.instructions,
            time: res.time,
          });
        });
    };
    getData();
  }, []);
  const onHandleChange = (e) => {
    console.log("files[0] in multer", e.target.files?.[0]);

    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",").map((i) => i.trim())
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;

    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("instructions", recipeData.instructions);

    // ✅ Always convert ingredients into a CSV string safely
    const ingredientsString = Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients.join(",")
      : recipeData.ingredients;

    formData.append("ingredients", ingredientsString);

    if (recipeData.file) {
      formData.append("file", recipeData.file);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/recipe/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error uploading recipe:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Edit the Recipe
        </h2>
        <form className="space-y-6" onSubmit={onHandleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={onHandleChange}
              value={recipeData.title}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <input
              type="text"
              name="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={onHandleChange}
              value={recipeData.time}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients (comma separated)
            </label>
            <textarea
              name="ingredients"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              onChange={onHandleChange}
              value={recipeData.ingredients}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              onChange={onHandleChange}
              value={recipeData.instructions}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recipe Image
            </label>
            <input
              type="file"
              name="file"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
              onChange={onHandleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
            >
              Edit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
