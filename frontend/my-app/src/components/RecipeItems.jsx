import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { MdWatchLater } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipe, setAllRecipe] = useState([]);

  useEffect(() => {
    setAllRecipe(recipes);
  }, [recipes]);

  const path = window.location.pathname === "/myrecipe"; // true if on /myrecipe

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipe((prevRecipe) => prevRecipe.filter((rec) => rec._id !== id));
  };

  // Track liked items
  const [liked, setLiked] = React.useState({});

  const toggleLike = (index) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {allRecipe?.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 transition hover:shadow-2xl flex flex-col"
        >
          {/* Image wrapper with heart button */}
          <div className="relative">
            <img
              src={`http://localhost:5000/public/images/${item.coverImage}`}
              alt={item.title}
              className="w-full aspect-[3/2] object-cover rounded-lg mb-4"
            />

            {/* Show edit & delete only if path === /myrecipe */}
            {path ? (
              <div className="absolute top-2 right-2 flex gap-3">
                {/* Edit icon navigates to /edit/<recipeId> */}
                <Link
                  to={`/editRecipe/${item._id}`}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <FaEdit className="text-blue-500 text-lg" />
                </Link>

                {/* Delete icon navigates to /delete/<recipeId> */}
                <button
                  onClick={() => onDelete(item._id)}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <MdDelete className="text-red-500 text-lg" />
                </button>
              </div>
            ) : (
              // Show like button otherwise
              <button
                onClick={() => toggleLike(index)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
              >
                {liked[index] ? (
                  <AiFillHeart className="text-2xl text-red-500" />
                ) : (
                  <CiHeart className="text-2xl text-gray-600" />
                )}
              </button>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-purple-900 mb-2">
            {item.title}
          </h2>

          {/* Ingredients */}
          <h4 className="text-gray-700 mb-1">
            <span className="font-semibold text-gray-800">Ingredients:</span>{" "}
            {Array.isArray(item.ingredients)
              ? item.ingredients.join(", ")
              : item.ingredients}
          </h4>

          {/* Instructions */}
          <h4 className="text-gray-700 mb-3">
            <span className="font-semibold text-gray-800">Instructions:</span>{" "}
            {item.instructions}
          </h4>

          {/* Time */}
          <div className="flex items-center text-gray-600 text-sm mt-auto">
            <MdWatchLater className="mr-1 text-lg text-green-600" />
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
