import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setIsOpen(true);
    }
  };
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav className="bg-green-200 border-b border-green-800 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold text-gray-900">
          Food Blog
        </a>
        <ul className="flex space-x-6 text-gray-800 text-sm font-medium">
          <li className="hover:text-green-600 transition cursor-pointer">
            Home
          </li>
          <li
            onClick={() => {
              handleProtectedRoute("/myrecipe");
            }}
            className="hover:text-green-600 transition cursor-pointer"
          >
            My Recipes
          </li>
          <li
            onClick={() => {
              handleProtectedRoute("/myfav");
            }}
            className="hover:text-green-600 transition cursor-pointer"
          >
            Favorites
          </li>
          <li onClick={checkLogin}>
            <a className="hover:text-green-600 transition cursor-pointer">
              {isLoggedIn ? "Logout" : "Login"}
            </a>
          </li>
        </ul>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm
              setIsOpen={() => setIsOpen(false)}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Modal>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
