import React from "react";

function Component({ isOpen, handleClose, children }) {
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ease-in-out duration-300 ${
        isOpen ? "opacity-1" : "opacity-0 pointer-events-none "
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6 relative">
          <div className="flex justify-between items-center pb-3">
            <button
              onClick={() => handleClose()}
              className="modal-close cursor-pointer z-50 absolute right-6 top-6"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </button>

            <React.Fragment>{children}</React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
