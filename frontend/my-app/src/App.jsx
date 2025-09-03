import { useState } from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import Chatbot from "./pages/Chatbot";
import MyFavorites from "./pages/MyFavorites";
const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get(`${import.meta.env.VITE_API_URL}/recipe`).then((res) => {
    allRecipes = res.data;
  });

  return allRecipes;
};

const getMyRecipe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => item.createdBy === user._id);
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path: "/myrecipe",
        element: <Home />,
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
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
