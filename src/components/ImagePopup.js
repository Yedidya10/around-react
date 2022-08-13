import React from 'react';
import xIcon from '../images/x-icon.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="close" type="button" className="button popup__close" onClick={props.onClose}>
          <img className="popup__close-icon" src={xIcon} alt="close" />
        </button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <span className="popup__name">{props.card.name}</span>
      </div>
    </div>
  );
}

export default ImagePopup;
