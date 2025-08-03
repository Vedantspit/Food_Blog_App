import React from "react";
import { useLoaderData } from "react-router-dom";
import { MdWatchLater } from "react-icons/md";

export default function RecipeItems() {
  const allRecipe = useLoaderData();
  console.log(allRecipe);

  return (
    <div className="px-10 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {allRecipe?.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 transition hover:shadow-2xl flex flex-col"
        >
          {/* Recipe Image */}
          <img
            src={`http://localhost:5000/public/images/${item.coverImage}`}
            alt={item.title}
            className="w-full aspect-[3/2] object-cover rounded-lg mb-4"
          />

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
