import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarLink = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(avatarLink);
    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  };

  return (
    <div>
      <PopupWithForm
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
        name='edit-avatar'
        title='Edit avatar'
        avatarLinkInput={
          <>
            <input id='image-url' className='form__input' type='url' name='url' placeholder='Image link' required ref={avatarLink} />
            <span className='form__input-error profile-pic-url-error'></span>
          </>
        }
        button='Save'
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditAvatarPopup;
