import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-100 text-gray-800 py-4 fixed bottom-0 left-0 w-full shadow-md z-50">
        <div className="text-center text-sm font-semibold tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">Vedant Deshmukh</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
