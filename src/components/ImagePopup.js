import React, { useEffect } from 'react';
import xIcon from '../images/x-icon.svg';

function ImagePopup(props) {
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
    <div className={`popup popup_type_image ${props.isImagePopupOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
      <div className="popup__container" onMouseDown={(event) => event.stopPropagation()}>
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
