import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

import '../index.css';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen , setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen , setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen , setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard , setSelectedCard] = useState({});
  const [isImagePopupOpen , setIsImagePopupOpen] = useState(false);

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
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className='page'>
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name='edit-profile' title='Edit profile' button='Save' />
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name='add-place' title='Add place' button='Add' />
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name='edit-avatar' title='Edit avatar' button='Save' />
      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
