import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

import api from '../utils/api';
import UserContext from '../contexts/CurrentUserContext';

import '../index.css';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [addSubmitButtonText, setAddSubmitButtonText] = useState('Add');
  const [editSubmitButtonText, setEditSubmitButtonText] = useState('Save');
  const [deleteSubmitButtonText, setDeleteSubmitButtonText] = useState('Delete');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
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
  }, []);

  // Handle Events
  useEffect(() => {
    setEditSubmitButtonText(isLoading ? 'Saving...' : 'Save');
    setAddSubmitButtonText(isLoading ? 'Adding...' : 'Add');
    setDeleteSubmitButtonText(isLoading ? 'Deleting...' : 'Delete');
  }, [isLoading]);

  const handleUpdateUser = (data) => {
    console.log(data);
    setIsLoading(true);
    api
      .updateProfileText(data)
      .then((data) => {
        setCurrentUser(data);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (cardData) => {
    setIsLoading(true);
    api
      .createCard(cardData)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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

  const handleDeleteCardClick = () => {
    setIsDeleteCardPopupOpen();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

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
          onCardDeleteButtonClick={handleDeleteCardClick}
          cards={cards}
          setSelectedCard={setSelectedCard}
        />
        <Footer />
        <EditProfilePopup
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
          editSubmitButtonText={editSubmitButtonText}
        />
        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          editSubmitButtonText={editSubmitButtonText}
        />
        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          addSubmitButtonText={addSubmitButtonText}
        />
        <DeleteCardPopup
          isDeleteCardPopupOpen={isDeleteCardPopupOpen}
          onClose={handleCloseAllPopups}
          deleteSubmitButtonText={deleteSubmitButtonText}
          onDeleteCardSubmit={handleCardDelete}
        />
        <ImagePopup isImagePopupOpen={isImagePopupOpen} onClose={handleCloseAllPopups} card={selectedCard} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
