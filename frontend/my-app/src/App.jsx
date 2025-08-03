import { useState } from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get("http://localhost:5000/recipe").then((res) => {
    allRecipes = res.data;
  });

  return allRecipes;
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
      },
      {
        path: "/myfav",
        element: <Home />,
      },
      {
        path: "/addRecipe",
        element: <AddFoodRecipe />,
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
