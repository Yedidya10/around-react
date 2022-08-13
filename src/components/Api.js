import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
  }
  
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
    return fetch(`${this.props.baseUrl}/cards`, {
      method: 'POST',
      headers: this.props.headers,
      body: JSON.stringify(cardData),
    }).then((res) => this._getResponseData(res));
  };

  addLike = (cardId) => {
    return fetch(`${this.props.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.props.headers,
    }).then((res) => this._getResponseData(res));
  };

  deleteLike = (cardId) => {
    return fetch(`${this.props.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.props.headers,
    }).then((res) => this._getResponseData(res));
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

  updateProfilePic = (userData) => {
    return fetch(`${this.props.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.props.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponseData(res));
  };


  render() {
    return (
      <div>

      </div>
    );
  }
};

export default Api;
