import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className='card' key={props.key}>
            <button aria-label='trash' type='button' className='button card__trash'></button>
            <img className='card__image' src={props.card.link} alt='card' onClick={handleClick} />
            <div className='card__details'>
            <h2 className='card__name'>{props.card.name}</h2>
            <div className='card__like-wrapper'>
                <button aria-label='like' type='button' className='button card__like'></button>
                <span className='card__like-amount'>{props.card.likes.length}</span>
            </div>
            </div>
        </li>
    );
}

export default Card;