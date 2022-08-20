import React, { useContext } from 'react';

import userContext from '../contexts/CurrentUserContext';

function Card({ card, text, link, likesCount, onCardLike, onCardClick, onCardDelete }) {
  const currentUser = useContext(userContext);

  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const isOwner = card.owner._id === currentUser._id;
  const cardLikeButtonClassName = `button card__like ${isLiked ? 'card__like card__like_active' : ''}`;
  const cardDeleteButtonClassName = `button card__trash ${isOwner ? 'card__trash_visible' : 'card__trash_hidden'}`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick =() => {
    onCardDelete(card);
  }

  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className='card'>
      <button aria-label='trash' type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className='card__image' src={link} alt={`card: "${text}"`} onClick={handleCardClick} />
      <div className='card__details'>
        <h2 className='card__name'>{text}</h2>
        <div className='card__like-wrapper'>
          <button aria-label='like' type='button' className={cardLikeButtonClassName} onClick={() => handleLikeClick(card)}></button>
          <span className='card__like-amount'>{likesCount}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
