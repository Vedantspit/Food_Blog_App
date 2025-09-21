import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdWatchLater } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [liked, setLiked] = useState({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const toastTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      setLoading(true); // Start spinner

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/${userId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFavorites(res.data);

        const initialLiked = {};
        res.data.forEach((item) => {
          initialLiked[item._id] = true;
        });
        setLiked(initialLiked);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false); // Stop spinner
      }
    };

    fetchFavorites();
  }, [userId]);

  const toggleLike = async (recipeId) => {
    if (!userId) {
      alert("Please login to favorite recipes.");
      navigate("/");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/${userId}/favorites/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      showToast("Removed from favorites");

      setFavorites((prev) => prev.filter((r) => r._id !== recipeId));
      setLiked((prev) => {
        const copy = { ...prev };
        delete copy[recipeId];
        return copy;
      });
    } catch (err) {
      console.error("Error removing favorite:", err);
      showToast("Failed to remove favorite");
    }
  };

  if (!userId) {
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to view your favorites.
      </p>
    );
  }

  // Show spinner while loading
  if (loading) {
    return <Spinner />;
  }

  if (favorites.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You don’t have any favorites yet.
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-10 py-6 relative">
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-md z-50">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col transition hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-70 object-cover rounded-lg"
              />

              <button
                onClick={() => toggleLike(item._id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
              >
                {liked[item._id] ? (
                  <AiFillHeart className="text-2xl text-red-500" />
                ) : (
                  <CiHeart className="text-2xl text-gray-600" />
                )}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-purple-900 mb-2">
              {item.title}
            </h2>

            <h4 className="text-gray-700 mb-1 text-sm sm:text-base">
              <span className="font-semibold text-gray-800">Ingredients:</span>{" "}
              {Array.isArray(item.ingredients)
                ? item.ingredients.join(", ")
                : item.ingredients}
            </h4>

            <h4 className="text-gray-700 mb-3 text-sm sm:text-base">
              <span className="font-semibold text-gray-800">Instructions:</span>{" "}
              {item.instructions}
            </h4>

            <div className="flex items-center text-gray-600 text-xs sm:text-sm mt-auto">
              <MdWatchLater className="mr-1 text-lg text-green-600" />
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
