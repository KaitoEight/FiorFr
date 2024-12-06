import React, { useState, useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto dismiss after 3 seconds
    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-5 px-4 py-2 rounded-md shadow-lg transition-all duration-300 ${
        type === "success" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm">{message}</p>
        <button onClick={onClose} className="ml-4 text-lg font-bold">
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
