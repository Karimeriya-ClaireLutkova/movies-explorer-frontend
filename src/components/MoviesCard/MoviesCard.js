import React from 'react';
import { useLocation } from 'react-router-dom';
import { urlBeginning } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({ movie, onMovieLike, onMovieDelete}) {
  const { pathname } = useLocation();
  const [isLike, setLike] = React.useState(false);
  const cardLikeButtonClassName = `element__button element__button_like ${isLike ? "element__button_like_active" : ""}`;
  const {url} = movie.image;
  const urlFull = `${urlBeginning}${url}`;
  const duration = movie.duration;
  const hour = Math.floor((duration / 60));
  const minutes = duration % 60;
  const newDuration = `${hour}ч ${minutes}м`;

  React.useEffect(() => {
    if (movie.owner === '' || movie.owner === undefined) {
      setLike(false);
    } else {
      setLike(true);
    }
  }, [movie.owner, movie]);

  function handleLikeClick() {
    if (movie.owner === '' || movie.owner === undefined) {
      setLike(true);
    } else {
      setLike(false);
    }
    onMovieLike(movie);
  }

  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  return (
    <div className="element">
      { pathname === '/movies' ? (
        <img className="element__image" src={urlFull} alt={`Постер к фильму ${movie.nameRU}`} />
      ) : (
        <img className="element__image" src={movie.image} alt={`Постер к фильму ${movie.nameRU}`} />
      )}
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
      <div className="element__duration">{newDuration}</div>
    </div>
  )
}

export default MoviesCard;