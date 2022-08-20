import React, { useEffect } from 'react';
import xIcon from '../images/x-icon.svg';

function PopupWithForm(props) {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        props.onClose();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  const nameInput = (userName, changeEvent) => {
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
        
          onChange={(e) => changeEvent(e)}
        />
        <span className='form__input-error about-me-error'></span>
      </>
    );
  };

  const aboutInput = (userDescription, changeEvent) => {
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
        
          onChange={(e) => changeEvent(e)}
        />
        <span className='form__input-error about-me-error'></span>
      </>
    );
  };

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
      <div className='popup__container' onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label='close' type='button' className='button popup__close' onClick={props.onClose}>
          <img className='popup__close-icon' src={xIcon} alt='close' />
        </button>
        <form name={`form_type_${props.name}`} className='form' onSubmit={props.onSubmit} noValidate>
          <h2 className='form__title'>{props.title}</h2>
          {props.name === 'edit-profile' ? nameInput(props.userName, props.onNameChange) : null}
          {props.name === 'edit-profile' ? aboutInput(props.userDescription, props.onDescriptionChange) : null}
          {props.addPlaceInputs}
          {props.avatarLinkInput}
          <button className='button form__submit' name='submit'>
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
