import React from 'react';

function Modal({ onClose, children }) {

  // handle click on the overlay to close the modal
  const handleOverlayClick = (event) => {

    // check if the click was on the overlay and not on the modal content
    if (event.target === event.currentTarget) {
      onClose(); // call the function to close the modal
    }

  };

  return (

    <div className="modal-overlay" onClick={handleOverlayClick}> {/* handle click on the overlay */}

      <div className="modal-content">
        {children} {/* display the modal content */}
      </div>

    </div>

  );
}


export default Modal;
