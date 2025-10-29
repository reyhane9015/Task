import React from "react";

function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
    >
      <div
        className={`relative flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden w-[80%] md:w-[30%] py-2`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* modal header */}
          <div className="flex items-center justify-between">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
          <button
            type="button"
            className="text-gray-400 bg-transparent cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center top-3.5 right-3.5"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* modal body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
