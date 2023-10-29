import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ userData, movie, onMovieLike, onMovieDelete }) {
  const { pathname } = useLocation();
  const isOwn = movie.owner._id !== userData._id;
  const cardLikeButtonClassName = `element__button element__button_like ${isOwn ? "element__button_like_active" : ""}`;

  function handleLikeClick() {
    onMovieLike(movie, userData);
  }

  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  return (
    <div className="element">
      <img className="element__image" src={movie.image} alt={`Постер к фильму ${movie.nameRU}`} />
      <div className="element__description">
        <h3 className="element__title">{movie.nameRU}</h3>
        <div className="element__container-like">
          { pathname === '/movies' ? (
              <button type="button" className={cardLikeButtonClassName} aria-label="Добавить фильм в сохраненные" onClick={handleLikeClick} />
            ) : (
              <button type="button" className="element__button element__button_delete element__button_delete_active" aria-label="Удалить фильм из сохраненных" onClick={handleDeleteClick} />              
            )
          }
        </div>
      </div>
      <div className="element__duration">{movie.duration}</div>
    </div>  
  )
}

export default MoviesCard;