import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { MdWatchLater } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData(); // comes from your route loader
  const [allRecipe, setAllRecipe] = useState([]);
  const [liked, setLiked] = useState({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true); // start as loading
  const navigate = useNavigate();

  // Memoize user data
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const userId = user?._id;
  const path = window.location.pathname === "/myrecipe";

  // When recipes load from loader
  useEffect(() => {
    if (recipes) {
      setAllRecipe(recipes);
      setLoading(false);
    } else {
      setAllRecipe([]);
      setLoading(false);
    }
  }, [recipes]);

  // Fetch user favorites
  useEffect(() => {
    let isCancelled = false;

    const fetchUserFavorites = async () => {
      if (!userId || !recipes?.length) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/${userId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            timeout: 3000,
          }
        );

        if (!isCancelled && res.data) {
          const favoriteIds = res.data.map((fav) => fav._id);
          const initialLiked = {};
          recipes.forEach((r, i) => {
            initialLiked[i] = favoriteIds.includes(r._id);
          });
          setLiked(initialLiked);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch favorites:", err);
          setLiked({});
        }
      }
    };

    const timeoutId = setTimeout(fetchUserFavorites, 50);
    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [recipes, userId]);

  // Delete recipe
  const onDelete = useCallback(async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/recipe/${id}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        timeout: 5000,
      });
      setAllRecipe((prevRecipe) => prevRecipe.filter((rec) => rec._id !== id));
      setToast("Recipe deleted successfully");
      setTimeout(() => setToast(""), 2000);
    } catch (error) {
      console.error("Error deleting recipe:", error.response?.data || error);
      setToast("Failed to delete recipe");
      setTimeout(() => setToast(""), 2000);
    }
  }, []);

  // Like/unlike recipe
  const toggleLike = useCallback(
    async (recipeId, index) => {
      if (!userId) {
        setToast("You must be logged in to mark favorites.");
        setTimeout(() => setToast(""), 2000);
        return;
      }

      const wasLiked = liked[index];
      setLiked((prev) => ({ ...prev, [index]: !prev[index] })); // optimistic update

      try {
        let message = "";
        if (wasLiked) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/${userId}/favorites/${recipeId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              timeout: 5000,
            }
          );
          message = "Removed from favorites";
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/${userId}/favorites/${recipeId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              timeout: 5000,
            }
          );
          message = "Added to favorites";
        }
        setToast(message);
        setTimeout(() => setToast(""), 2000);
      } catch (err) {
        console.error("Error updating favorites:", err);
        setLiked((prev) => ({ ...prev, [index]: wasLiked })); // revert
        setToast("Failed to update favorites");
        setTimeout(() => setToast(""), 2000);
      }
    },
    [liked, userId]
  );

  // --- UI ---
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-purple-600 text-white px-4 py-2 rounded shadow-lg transition-all">
          {toast}
        </div>
      )}

      {allRecipe.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No recipes found.</div>
      ) : (
        <div className="px-4 sm:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allRecipe.map((item, index) => (
            <div
              key={item._id}
              className="bg-white shadow-lg border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col transition hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-70 object-cover rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                {path ? (
                  <div className="absolute top-2 right-2 flex gap-3">
                    <Link
                      to={`/editRecipe/${item._id}`}
                      className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                    >
                      <FaEdit className="text-blue-500 text-lg" />
                    </Link>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                    >
                      <MdDelete className="text-red-500 text-lg" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleLike(item._id, index)}
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

              <h2 className="text-lg sm:text-xl font-bold text-purple-900 mb-2">
                {item.title}
              </h2>
              <h4 className="text-gray-700 mb-1 text-sm sm:text-base">
                <span className="font-semibold text-gray-800">
                  Ingredients:
                </span>{" "}
                {Array.isArray(item.ingredients)
                  ? item.ingredients.join(", ")
                  : item.ingredients}
              </h4>
              <h4 className="text-gray-700 mb-3 text-sm sm:text-base">
                <span className="font-semibold text-gray-800">
                  Instructions:
                </span>{" "}
                {item.instructions}
              </h4>
              <div className="flex items-center text-gray-600 text-xs sm:text-sm mt-auto">
                <MdWatchLater className="mr-1 text-lg text-green-600" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
