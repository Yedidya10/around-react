import React from "react";

class Api extends React.Component {
  _getResponseData = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  getUser = () => {
    return fetch(`${this.props.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.props.headers
    })
    .then((res) => this._getResponseData(res));
  }

  getCards = () => {
    return fetch(`${this.props.baseUrl}/cards`, {
      method: 'GET',
      headers: this.props.headers,
    }).then((res) => this._getResponseData(res));
  };

  createCard = (cardData) => {
    console.log(cardData);
    return fetch(`${this.props.baseUrl}/cards`, {
      method: 'POST',
      headers: this.props.headers,
      body: JSON.stringify(cardData),
    }).then((res) => this._getResponseData(res));
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    if (isLiked) {
      return fetch(`${this.props.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.props.headers,
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this.props.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.props.headers,
      }).then((res) => this._getResponseData(res));
    }
  };

  deleteCard = (cardId) => {
    return fetch(`${this.props.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.props.headers,
    }).then((res) => this._getResponseData(res));
  };

  updateProfileText = (userData) => {
    return fetch(`${this.props.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.props.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponseData(res));
  };

  updateAvatar = (avatar) => {
    return fetch(`${this.props.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.props.headers,
      body: JSON.stringify(avatar),
    }).then((res) => this._getResponseData(res));
  };
};


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "55231eda-cfe8-472e-9c18-93282af161bd",
    "Content-Type": "application/json"
  }
});

export default api;
