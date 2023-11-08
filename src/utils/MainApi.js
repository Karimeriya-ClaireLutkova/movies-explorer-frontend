class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {headers: {
      ...this._headers,
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }})
    .then((res) => this._checkResponseRequest(res))
  }

  editProfileInfo(name, email) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name, email}),
    })
    .then((res) => this._checkResponseRequest(res))
  }

  getMovies() {
    return fetch(`${this._baseUrl}movies`, {headers: {
      ...this._headers, 
      'authorization': `Bearer ${localStorage.getItem('jwt')}` },
    }).then((res) => this._checkResponseRequest(res));
  }

  addMovie(item) {
    return fetch(`${this._baseUrl}movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        ...item,
      }),
    }).then((res) => this._checkResponseRequest(res));
  }

  deleteMovie(item) {
    return fetch(`${this._baseUrl}movies/${item}`, {
      method: "DELETE",
      headers: { 
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then((res) => this._checkResponseRequest(res));
  }

  _checkResponseRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.moviesyp.students.nomoredomainsrocks.ru/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;