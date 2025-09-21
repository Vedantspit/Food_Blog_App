import React, { useState } from "react";
import foodRecipe from "../assets/foodRecipe.png";
import RecipeItems from "../components/RecipeItems";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

function Home({ showHero }) {
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {showHero && (
        <>
          <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 py-20 bg-green-50">
            <div className="max-w-xl text-center md:text-left space-y-6">
              <h1 className="text-5xl font-extrabold text-green-700">
                FoodShare Web
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Discover delicious recipes for every taste and occasion. From
                quick snacks to full-course meals, all shared by food lovers
                like you.
              </p>
              <button
                onClick={() => handleProtectedRoute("/addRecipe")}
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
              >
                Share Your Recipe
              </button>
            </div>

            {/* Right Image */}
            <div className="mb-10 md:mb-0">
              <img
                src={foodRecipe}
                alt="Food"
                className="w-[300px] md:w-[380px] h-auto object-contain"
              />
            </div>
          </section>

          {/* Decorative Wave */}
          <div>
            <svg
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#16a34a"
                fillOpacity="1"
                d="M0,256L26.7,218.7C53.3,181,107,107,160,90.7C213.3,75,267,117,320,154.7C373.3,192,427,224,480,234.7C533.3,245,587,235,640,218.7C693.3,203,747,181,800,149.3C853.3,117,907,75,960,53.3C1013.3,32,1067,32,1120,42.7C1173.3,53,1227,75,1280,96C1333.3,117,1387,139,1413,149.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
              ></path>
            </svg>
          </div>
        </>
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm
            setIsOpen={() => setIsOpen(false)}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Modal>
      )}

      <div className="px-6 md:px-24 py-12 bg-white">
        <RecipeItems />
      </div>
    </>
  );
}

export default Home;
