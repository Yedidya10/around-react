import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarLink = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  };

  return (
    <>
      <PopupWithForm
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
        formName='edit-avatar'
        formTitle='Edit avatar'
        buttonText={props.editSubmitButtonText}
        onSubmit={handleSubmit}>
        <input id='image-url' className='form__input' type='url' name='url' placeholder='Image link' required ref={avatarLink} />
        <span className='form__input-error profile-pic-url-error'></span>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
