import React, { useContext } from 'react';

import Card from './Card';

import UserContext from '../contexts/CurrentUserContext';

import editIcon from '../images/edit-icon.svg';
import xIcon from '../images/x-icon.svg';

function Main({ onEditProfile, onEditAvatar, onAddPlace, cards, onCardClick, onCardLike, onCardDeleteButtonClick, setSelectedCard }) {
  const { currentUser } = useContext(UserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__img-wrapper'>
          <img className='profile__image' src={currentUser.avatar} alt='profile avatar' />
          <div className='profile__img-overlay' onClick={onEditAvatar}>
            <img className='profile__edit-img' src={editIcon} alt='edit-icon' />
          </div>
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <p className='profile__about-me'>{currentUser.about}</p>
          <button aria-label='Edit Profile' type='button' className='button popup-button profile__edit' onClick={onEditProfile}>
            <img className='profile__edit-icon' src={editIcon} alt='edit icon' />
          </button>
        </div>
        <button aria-label='Add Card' type='button' className='button popup-button profile__add-card' onClick={onAddPlace}>
          <img src={xIcon} alt='add' />
        </button>
      </section>
      <section>
        <ul className='cards'>
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                text={card.name}
                likesCount={card.likes.length}
                link={card.link}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDeleteButtonClick={onCardDeleteButtonClick}
                setSelectedCard={setSelectedCard}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
