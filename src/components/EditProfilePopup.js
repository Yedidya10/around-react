import React, { useState, useEffect, useContext } from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
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
    }

  return (
    <div>
      <PopupWithForm
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
        name='edit-profile'
        title='Edit profile'
        button='Save'
        userName={name}
        userDescription={description}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditProfilePopup;
