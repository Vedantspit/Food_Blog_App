import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(false); // 🔹 loading state
  const navigate = useNavigate();

  const onHandleChange = (e) => {
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
    if (loading) return; // 🔹 avoid double submit

    setLoading(true);
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("instructions", recipeData.instructions);
    formData.append("ingredients", recipeData.ingredients.join(","));
    formData.append("file", recipeData.file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/recipe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error uploading recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Share Your Recipe
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
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <input
              type="text"
              name="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={onHandleChange}
              required
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
              required
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
              required
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
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 w-full`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Uploading..." : "Add Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
