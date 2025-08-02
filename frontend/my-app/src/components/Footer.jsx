import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4">
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} Vedant Deshmukh
      </div>
    </footer>
  );
}

export default Footer;
