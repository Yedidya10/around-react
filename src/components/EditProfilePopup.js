import React, { useState, useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const {currentUser} = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.description);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <>
      <PopupWithForm
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
        formName='edit-profile'
        formTitle='Edit profile'
        buttonText={props.editSubmitButtonText}
        userName={name}
        userDescription={description}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}>
        <input
          id='name'
          className='form__input'
          type='text'
          name='name'
          placeholder='Name'
          minLength='2'
          maxLength='200'
          required
          onChange={(e) => handleNameChange(e)}
        />
        <span className='form__input-error about-me-error'></span>
        <input
          id='about-me'
          className='form__input'
          type='text'
          name='about-me'
          placeholder='About me'
          minLength='2'
          maxLength='200'
          required
          onChange={(e) => handleDescriptionChange(e)}
        />
        <span className='form__input-error about-me-error'></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
