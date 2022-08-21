import React from 'react';

import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onDeleteCardSubmit();
  };
  return (
    <PopupWithForm
      isOpen={props.isDeleteCardPopupOpen}
      formTitle='Are you sure?'
      formName='delete-card'
      buttonText={props.deleteSubmitButtonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    />
  );
}

export default DeleteCardPopup;
