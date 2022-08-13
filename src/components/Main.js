import React, { useState, useEffect } from 'react';

import Card from './Card';
import api from '../utils/api';
import editIcon from '../images/edit-icon.svg';
import xIcon from '../images/x-icon.svg';

function Main( props ) {
  const [ userName, setUserName ] = useState('');
  const [ userDescription, setUserDescription ] = useState('');
  const [ userAvatar, setUserAvatar ] = useState('');
  const [ cards , setCards ] = useState([]);


  useEffect(() => {
    api.getUser()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      }).catch(err => {
        console.log(err);
      }
    );
  } , []);

  useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      }).catch(err => {
        console.log(err);
      }
    );
  } , []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__img-wrapper'>
          <img className='profile__image' src={userAvatar} alt='profile avatar' />
          <div className='profile__img-overlay' onClick={props.onEditAvatar}>
            <img className='profile__edit-img' src={editIcon} alt='edit-icon' />
          </div>
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{userName}</h1>
          <p className='profile__about-me'>{userDescription}</p>
          <button aria-label='Edit Profile' type='button' className='button popup-button profile__edit' onClick={props.onEditProfile}>
            <img className='profile__edit-icon' src={editIcon} alt='edit icon' />
          </button>
        </div>
        <button aria-label='Add Card' type='button' className='button popup-button profile__add-card' onClick={props.onAddPlace}>
          <img src={xIcon} alt='add' />
        </button>
      </section>
      <section>
        <ul className='cards'>
          {cards.map(card => {
            return <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          } )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
