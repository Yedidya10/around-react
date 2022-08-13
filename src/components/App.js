import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

import '../index.css';
import xIcon from '../images/x-icon.svg';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen , setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen , setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen , setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard , setSelectedCard] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className='page'>
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name='edit-profile' title='Edit profile' button='Save' />
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name='add-place' title='Add place' button='Add' />
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name='edit-avatar' title='Edit avatar' button='Save' />
      <ImagePopup isOpen={selectedCard !== false} onClose={closeAllPopups} card={selectedCard} />

      <div id='delete-card-popup' className='popup'>
        <div className='popup__container'>
          <button aria-label='close' type='button' className='button popup__close'>
            <img className='popup__close-icon' src={xIcon} alt='close' />
          </button>
          <form name='delete-card-form' id='delete-card-form' className='form' noValidate>
            <h2 className='form__title'>Are you sure?</h2>
            <button className='button form__submit' name='submit'>
              Yes
            </button>
          </form>
        </div>
      </div>
      <div id='edit-avatar-popup' className='popup'>
        <div className='popup__container'>
          <button aria-label='close' type='button' className='button popup__close'>
            <img className='popup__close-icon' src={xIcon}  alt='close' />
          </button>
          <form name='edit-profile-pic-form' id='edit-profile-pic-form' className='form' noValidate>
            <h2 className='form__title'>Change profile picture</h2>
            <input id='profile-pic-url' className='form__input' type='url' name='url' placeholder='Image link' required />
            <span className='form__input-error profile-pic-url-error'></span>
            <button className='button form__submit' name='submit'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
