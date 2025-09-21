import React, { useState } from "react";
import axios from "axios";

function InputForm({ setIsOpen, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? "signUp" : "login";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      setIsOpen(false);
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-10 bg-white rounded-3xl shadow-2xl space-y-8 transition-all duration-300 min-h-[520px]"
      >
        {/* Fixed height and unified title length */}
        <h2 className="text-3xl font-bold text-center text-gray-800 min-h-[40px]">
          {isSignUp ? "Create Your Account" : "Access Your Account"}
        </h2>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-4/5 mx-auto block bg-green-500 text-white text-lg font-semibold py-3 rounded-xl hover:bg-green-600 transition duration-200"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        {error && (
          <p className="w-4/5 mx-auto text-center text-base text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </p>
        )}

        <p
          onClick={() => setisSignUp((prev) => !prev)}
          className="w-4/5 mx-auto block text-center text-base bg-green-500 text-white font-medium py-3 rounded-xl hover:bg-green-600 transition cursor-pointer"
        >
          {isSignUp ? "Already have an account?" : "Create a new account"}
        </p>
      </form>
    </>
  );
}

export default InputForm;
