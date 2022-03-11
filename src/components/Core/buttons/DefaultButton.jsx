import React from "react";

const DefaultButton = ({ children, disabled = false, onClick }) => {
  return (
    <button
      className={`w-full text-white font-bold py-2 rounded text-sm rounded-lg transition duration-500 ease-in-out ${
        disabled
          ? "bg-gray-20 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
