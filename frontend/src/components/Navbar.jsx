import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  // Protected route handler
  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
      setMenuOpen(false); // close mobile menu
    } else {
      setIsOpen(true); // open login modal
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  // Login button click
  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setIsOpen(true);
    }
  };

  // Extract first part of email for display
  const getDisplayName = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  // Desktop link class generator
  const linkClass = ({ isActive }) =>
    `transition cursor-pointer ${
      isActive ? "text-green-600 font-semibold" : "text-gray-800"
    }`;

  // Mobile link class generator
  const mobileLinkClass = (path) =>
    `block px-2 py-1 rounded transition ${
      location.pathname === path
        ? "bg-green-300 text-green-800 font-semibold"
        : "text-gray-800 hover:text-green-600"
    }`;

  // Page heading based on route
  const getPageHeading = () => {
    switch (location.pathname) {
      case "/myrecipe":
        return "Your Recipes";
      case "/myfav":
        return "Your Favorites";
      case "/":
        return "Welcome Home";
      default:
        return "";
    }
  };

  return (
    <>
      <nav className="bg-green-200 border-b border-green-800 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-semibold text-gray-900">
            FoodShare Web
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-sm font-medium items-center">
            <li>
              <span
                onClick={() => handleProtectedRoute("/chatbot")}
                className={linkClass({
                  isActive: location.pathname === "/chatbot",
                })}
              >
                ChefBot 🧑‍🍳
              </span>
            </li>
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <span
                onClick={() => handleProtectedRoute("/myrecipe")}
                className={linkClass({
                  isActive: location.pathname === "/myrecipe",
                })}
              >
                My Recipes
              </span>
            </li>
            <li>
              <span
                onClick={() => handleProtectedRoute("/myfav")}
                className={linkClass({
                  isActive: location.pathname === "/myfav",
                })}
              >
                Favorites
              </span>
            </li>
            <li onClick={handleLoginClick}>
              <span className="hover:text-green-600 transition cursor-pointer">
                {isLoggedIn
                  ? `Logout (${getDisplayName(user?.email)})`
                  : "Login"}
              </span>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-green-100 px-4 pt-2 pb-4 space-y-2">
            <span
              onClick={() => handleProtectedRoute("/chatbot")}
              className={mobileLinkClass("/chatbot")}
            >
              ChefBot 🧑‍🍳
            </span>
            <NavLink
              to="/"
              className={mobileLinkClass("/")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <span
              onClick={() => handleProtectedRoute("/myrecipe")}
              className={mobileLinkClass("/myrecipe")}
            >
              My Recipes
            </span>
            <span
              onClick={() => handleProtectedRoute("/myfav")}
              className={mobileLinkClass("/myfav")}
            >
              Favorites
            </span>
            <span
              onClick={handleLoginClick}
              className="block px-2 py-1 rounded text-gray-800 hover:text-green-600"
            >
              {isLoggedIn ? `Logout (${getDisplayName(user?.email)})` : "Login"}
            </span>
          </div>
        )}

        {/* Login Modal */}
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm
              setIsOpen={() => setIsOpen(false)}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Modal>
        )}
      </nav>

      {/* Page Heading - Centered */}
      {getPageHeading() && (
        <div className="bg-green-100 text-gray-800 px-4 py-2 border-b border-green-300">
          <h2 className="text-lg font-semibold text-center">
            {getPageHeading()}
          </h2>
        </div>
      )}
    </>
  );
}

export default Navbar;
