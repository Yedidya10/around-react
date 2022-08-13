import Api from '../components/Api';

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "55231eda-cfe8-472e-9c18-93282af161bd",
    "Content-Type": "application/json"
  }
});

export default api;
