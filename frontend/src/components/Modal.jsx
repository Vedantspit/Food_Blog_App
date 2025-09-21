import React, { useRef, useEffect } from "react";

function Modal({ onClose, children }) {
  const modalRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
        <div ref={modalRef} className="animate-scaleIn">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
