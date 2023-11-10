import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({userData, movie, onMovieLike, onMovieDelete}) {
  const { pathname } = useLocation();
  const [isOwner, setOwner] = React.useState(false);
  const cardLikeButtonClassName = `element__button element__button_like ${isOwner ? "element__button_like_active" : ""}`;

  React.useEffect(() => {
    if(movie.owner.jwt === undefined || movie.owner.jwt === '' ) {
      setOwner(false);
    } else if(movie.owner.jwt === userData.jwt) {
      setOwner(true);
    }
  }, [movie.owner.jwt, userData.jwt, movie])

  function handleLikeClick() {
    onMovieLike(movie, userData);
  }

  function handleDeleteClick() {
    onMovieDelete(movie, userData);
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
              <button type="button" className="element__button element__button_delete" aria-label="Удалить фильм из сохраненных" onClick={handleDeleteClick} />          
            )
          }
        </div>
      </div>
      <div className="element__duration">{movie.duration}</div>
    </div>
  )
}

export default MoviesCard;