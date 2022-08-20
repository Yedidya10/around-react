import React, { useRef } from 'react';

import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  const addPlaceName = useRef(null);
  const addPlaceLink = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: addPlaceName.current.value,
      link: addPlaceLink.current.value,
    });
  };

  
  return (
    <div>
      <PopupWithForm
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onClose}
        name='add-place'
        title='Add place'
        addPlaceInputs={
          <>
            <input
              id='name'
              className='form__input'
              type='text'
              name='name'
              placeholder='Name'
              minLength='2'
              maxLength='200'
              required
              ref={addPlaceName}
            />
            <span className='form__input-error about-me-error'></span>
            <input id='image-url' className='form__input' type='url' name='url' placeholder='Image link' required ref={addPlaceLink} />
            <span className='form__input-error profile-pic-url-error'></span>
          </>
        }
        button='Add'
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddPlacePopup;
