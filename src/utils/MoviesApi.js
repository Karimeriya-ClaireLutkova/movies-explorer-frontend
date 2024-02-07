class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getMovies() {
    return fetch(`${this._baseUrl}beatfilm-movies`, {
      headers: this._headers,
    }).then((res) => this._checkResponseRequest(res))
  }

  _checkResponseRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;