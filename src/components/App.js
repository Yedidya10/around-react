import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import api from '../utils/api';
import UserContext from '../contexts/CurrentUserContext';

import '../index.css';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [addSubmitButtonText, setAddSubmitButtonText] = useState('Add');
  const [editSubmitButtonText, setEditSubmitButtonText] = useState('Save');

  useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser({
          name: data.name,
          description: data.about,
          avatar: data.avatar,
          _id: data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
    .getCards()
    .then((data) => {
      setCards(data);
    })
    .catch((err) => {
      console.log(err);
    });
  } , []);

  // Handle Events
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => (currentCard._id === card._id ? newCard : currentCard)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .updateProfileText(data)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          description: data.about,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditSubmitButtonText('Saving...');
        handleCloseAllPopups();
        setEditSubmitButtonText('Save');
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditSubmitButtonText('Saving...');
        handleCloseAllPopups();
        setEditSubmitButtonText('Save');
      });
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .createCard(cardData)
      .then((cardData) => {
        setCards([cardData, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddSubmitButtonText('Adding...');
        handleCloseAllPopups();
        setAddSubmitButtonText('Add');
      });
  };

  return (
    <div className='page'>
      <UserContext.Provider value={{ currentUser }}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup isEditProfilePopupOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups} onUpdateUser={handleUpdateUser} editSubmitButtonText={editSubmitButtonText}/>
        <EditAvatarPopup isEditAvatarPopupOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups} onUpdateAvatar={handleUpdateAvatar} editSubmitButtonText={editSubmitButtonText}/>
        <AddPlacePopup isAddPlacePopupOpen={isAddPlacePopupOpen} onClose={handleCloseAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} addSubmitButtonText={addSubmitButtonText}/>
        <ImagePopup isImagePopupOpen={isImagePopupOpen} onClose={handleCloseAllPopups} card={selectedCard} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
