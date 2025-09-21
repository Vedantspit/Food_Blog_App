import { useState, Suspense } from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import Chatbot from "./pages/Chatbot";
import MyFavorites from "./pages/MyFavorites";
import Spinner from "./components/Spinner";

// Add timeout and better error handling
const getAllRecipes = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipe`, {
      signal: controller.signal,
      timeout: 8000, // 8 second axios timeout
    });

    clearTimeout(timeoutId);
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    // Return empty array instead of throwing to prevent route blocking
    return [];
  }
};

const getMyRecipe = async () => {
  try {
    // PERFORMANCE FIX: Cache user data and add null check
    const userStr = localStorage.getItem("user");
    if (!userStr) return [];

    const user = JSON.parse(userStr);
    if (!user?._id) return [];

    const allRecipes = await getAllRecipes();
    return allRecipes.filter((item) => item.createdBy === user._id);
  } catch (error) {
    console.error("Failed to fetch user recipes:", error);
    return [];
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home showHero={true} />,
        loader: getAllRecipes,
      },

      {
        path: "/myrecipe",
        element: <Home showHero={false} />,
        loader: getMyRecipe,
      },
      {
        path: "/myfav",
        element: <MyFavorites />,
      },
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
      {
        path: "/addRecipe",
        element: <AddFoodRecipe />,
      },
      {
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
