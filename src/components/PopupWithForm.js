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



  return (
    <div className={`popup popup_type_${props.formName} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
      <div className='popup__container' onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label='close' type='button' className='button popup__close' onClick={props.onClose}>
          <img className='popup__close-icon' src={xIcon} alt='close' />
        </button>
        <form name={`form_type_${props.formTitle}`} className='form' onSubmit={props.onSubmit} noValidate>
          <h2 className='form__title'>{props.title}</h2>
          {props.children}
          <button className='button form__submit' name='submit'>
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
