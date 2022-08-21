import React, { useEffect, useContext } from 'react';
import useForm from '../hooks/useForm';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({});
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isEditProfilePopupOpen}
      onClose={props.onClose}
      formName='edit-profile'
      formTitle='Edit profile'
      buttonText={props.editSubmitButtonText}
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
        value={values.name || ''}
        onChange={(e) => handleChange(e) }
      />
      <span className='form__input-error about-me-error'></span>
      <input
        id='about-me'
        className='form__input'
        type='text'
        name='about'
        placeholder='About me'
        minLength='2'
        maxLength='200'
        required
        value={values.about || ''}
        onChange={(e) => handleChange(e)}
      />
      <span className='form__input-error about-me-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
