import React from "react";
import { useModal } from '../../context/Modal'
import "./ConfirmModal.css";

const ConfirmModal = ({ modalTitle, subTitle, yesHandler, optionalCBArg }) => {
  const { closeModal } = useModal();

  if (!modalTitle) return null;

  const handleClick = async () => {
    if(optionalCBArg) await yesHandler(optionalCBArg)
    else await yesHandler();
    closeModal();
  };

  return (
    <div className="confirm-modal-container">
      <h1 className="form-title">{modalTitle}</h1>
      {subTitle && <p className="form-subtitle">{subTitle}</p>}
      <div className="modal-button-container">
        <button className="blog-post-button submit" onClick={handleClick}>
          Yes
        </button>
        <button className='blog-post-button cancel' onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
