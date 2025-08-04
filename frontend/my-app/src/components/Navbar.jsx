import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink, useNavigate } from "react-router-dom";
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
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
        <ul className="flex space-x-6 text-sm font-medium items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition cursor-pointer ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-800"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => handleProtectedRoute("/myrecipe")}
              className={`transition cursor-pointer ${
                window.location.pathname === "/myrecipe"
                  ? "text-green-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              My Recipes
            </span>
          </li>
          <li>
            <span
              onClick={() => handleProtectedRoute("/myfav")}
              className={`transition cursor-pointer ${
                window.location.pathname === "/myfav"
                  ? "text-green-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              Favorites
            </span>
          </li>
          <li onClick={handleLoginClick}>
            <span className="hover:text-green-600 transition cursor-pointer">
              {isLoggedIn ? `Logout (${user?.email || ""})` : "Login"}
            </span>
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
