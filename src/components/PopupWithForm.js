import React, { useEffect } from 'react';
import xIcon from '../images/x-icon.svg';

function PopupWithForm(props) {

  useEffect(() => {
    const popup = document.querySelector('.popup_opened');

    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        props.onClose();
      }
    };

    const mousedownHandler = (event) => {
      if (event.target === popup) {
        props.onClose();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('mousedown', mousedownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('mousedown', mousedownHandler);
    };
  });

  const nameInput = () => {
    return (
      <>
        <input
        id='name'
        className='form__input'
        type='text'
        name='name'
        placeholder='Name'
        minLength='2'
        maxLength='200'
        required
        />
        <span className='form__input-error about-me-error'></span>
      </>
    );
  }

  const aboutInput = () => {
    return (
      <>
        <input
        id='about-me'
        className='form__input'
        type='text'
        name='about-me'
        placeholder='About me'
        minLength='2'
        maxLength='200'
        required
        />
        <span className='form__input-error about-me-error'></span>
      </>
    );
  }

  const linkInput = () => {
      return (
        <>
          <input id='image-url' className='form__input' type='url' name='url' placeholder='Image link' required />
          <span className='form__input-error profile-pic-url-error'></span>
        </>
      );
    
  }
  
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button aria-label='close' type='button' className='button popup__close' onClick={props.onClose}>
          <img className='popup__close-icon' src={xIcon} alt='close' />
        </button>
        <form name={`form_type_${props.name}`} className='form' noValidate>
          <h2 className='form__title'>{props.title}</h2>
          {['add-place','edit-profile'].includes(props.name) ? nameInput() : ''}
          {props.name === 'edit-profile' ? aboutInput() : ''}
          {['add-place','edit-avatar'].includes(props.name) ? linkInput() : ''}
          <button className='button form__submit' name='submit'>
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
