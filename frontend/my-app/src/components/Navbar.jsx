import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const checkLogin = () => {
    setIsOpen(true);
  };
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
          <li onClick={checkLogin}>
            <a className="hover:text-green-600 transition">Login</a>
          </li>
        </ul>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm setIsOpen={() => setIsOpen(false)} />
          </Modal>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
