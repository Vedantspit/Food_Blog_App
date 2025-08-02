import React from "react";
import foodRecipe from "../assets/foodRecipe.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <section className="flex items-center justify-between px-40 pt-30">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Food Recipe
          </h1>
          <h5 className="text-lg text-gray-600">
            Discover delicious recipes for every taste and occasion.
          </h5>
          <br></br>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
          >
            Share Your Recipe
          </button>
        </div>

        <div>
          <img
            src={foodRecipe}
            alt="Food"
            className="w-[320px] h-[300px] object-contain"
          />
        </div>
      </section>

      {/* Wave at bottom */}
      <div className="mt-auto">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#00cba9"
            fillOpacity="1"
            d="M0,256L26.7,218.7C53.3,181,107,107,160,90.7C213.3,75,267,117,320,154.7C373.3,192,427,224,480,234.7C533.3,245,587,235,640,218.7C693.3,203,747,181,800,149.3C853.3,117,907,75,960,53.3C1013.3,32,1067,32,1120,42.7C1173.3,53,1227,75,1280,96C1333.3,117,1387,139,1413,149.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}

export default Home;
