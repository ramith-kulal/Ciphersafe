import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnTablesPage = location.pathname === "/tables";

  const handleButtonClick = () => {
    if (isOnTablesPage) {
      navigate("/"); // Navigate to the home page
    } else {
      navigate("/tables"); // Navigate to the tables page
    }
  };

  return (
    <nav className="flex items-center justify-between w-full h-24 fixed top-0 bg-black p-4">
      {/* Left side content */}
      <div>
        <h1 className="text-white text-3xl font-bold tracking-wide font-poppins">
          Ciphersafe
        </h1>
        <p className="text-gray-300 text-lg font-light mt-1 font-sans">
          Because Your Brain Isn’t a Vault
        </p>
      </div>

      {/* Right side button */}
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out"
        onClick={handleButtonClick}
      >
        {isOnTablesPage ? "Go to Home" : "Saved Passwords"}
      </button>
    </nav>
  );
});

export default Navbar;
