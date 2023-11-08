export const BASE_URL = 'https://api.moviesyp.students.nomoredomainsrocks.ru';
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, email, password})
  })
    .then(checkResponse)
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
    },
  })
    .then(checkResponse)
}