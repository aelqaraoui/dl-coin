import React from "react";

const PlayButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-gray-30 w-full hover:bg-blue-accent text-white font-bold py-2 rounded text-sm rounded-lg transition duration-500 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PlayButton;
