import React from "react";

function Navbar() {
  return (
    <nav className="bg-green-200 border-b border-green-800 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold text-gray-900">
          Food Blog
        </a>
        <ul className="flex space-x-6 text-gray-800 text-sm font-medium">
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              My Recipes
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Favorites
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
