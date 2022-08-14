import React from 'react';

import xIcon from '../images/x-icon.svg';

function DeleteCardPopup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
      <div className='popup__container' onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label='close' type='button' className='button popup__close' onClick={props.onClose}>
          <img className='popup__close-icon' src={xIcon} alt='close' />
        </button>
        <form name={`form_type_${props.name}`} className='form' noValidate>
          <h2 className='form__title'>{props.title}</h2>
          <button className='button form__submit' name='submit'>
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteCardPopup;
