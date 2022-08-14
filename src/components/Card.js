import React from 'react';

function Card({ card, text, link, likesCount, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className='card'>
            <button aria-label='trash' type='button' className='button card__trash'></button>
            <img className='card__image' src={link} alt={`card: "${text}"`} onClick={handleClick} />
            <div className='card__details'>
            <h2 className='card__name'>{text}</h2>
            <div className='card__like-wrapper'>
                <button aria-label='like' type='button' className='button card__like'></button>
                <span className='card__like-amount'>{likesCount}</span>
            </div>
            </div>
        </li>
    );
}

export default Card;