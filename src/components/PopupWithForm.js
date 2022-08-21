import React from 'react';
import xIcon from '../images/x-icon.svg';

function PopupWithForm({isOpen, onClose, formName, formTitle, buttonText, children, onSubmit}) {

  return (
    <div className={`popup popup_type_${formName} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className='popup__container' onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label='close' type='button' className='button popup__close' onClick={onClose}>
          <img className='popup__close-icon' src={xIcon} alt='close' />
        </button>
        <form name={`form_type_${formName}`} className='form' onSubmit={onSubmit}>
          <h2 className='form__title'>{formTitle}</h2>
          {children}
          <button className='button form__submit' name='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
