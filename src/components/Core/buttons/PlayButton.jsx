import React from "react";

const PlayButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      className={`w-full text-white font-bold py-2 rounded text-sm rounded-lg transition duration-500 ease-in-out ${
        disabled
          ? "bg-gray-20 cursor-not-allowed"
          : "bg-gray-30 hover:bg-blue-accent "
      }`}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-10"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PlayButton;
