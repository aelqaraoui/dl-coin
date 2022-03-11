import React from "react";

const PlayButton = ({ children, onClick, disabled = false }) => {
  return (
    <button
      className={`w-full text-white font-bold py-2 rounded text-sm rounded-lg transition duration-500 ease-in-out ${
        disabled
          ? "bg-gray-20 cursor-not-allowed"
          : "bg-gray-30 hover:bg-blue-accent "
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PlayButton;
