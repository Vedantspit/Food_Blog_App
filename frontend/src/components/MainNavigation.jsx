// MainNavigation.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState, Suspense } from "react";

export default function MainNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
      </Suspense>
      <Footer />
    </>
  );
}
