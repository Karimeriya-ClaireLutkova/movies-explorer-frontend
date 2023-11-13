import React from 'react';
import { useLocation } from 'react-router-dom';
import { urlBeginning } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ movie, onMovieLike, onMovieDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const [isOwner, setOwner] = React.useState(false);
  const cardLikeButtonClassName = `element__button element__button_like ${isOwner ? "element__button_like_active" : ""}`;
  const {url} = movie.image;
  const urlFull = `${urlBeginning}${url}`;
  const duration = movie.duration;
  const hour = Math.floor((duration / 60));
  const minutes = duration % 60;
  const newDuration = `${hour}ч ${minutes}м`;

  React.useEffect(() => {
    if( movie.owner === '') {
      setOwner(false);
    } else if(movie.owner === currentUser._id) {
      setOwner(true);
    }
  }, [currentUser._id, movie, movie.owner])

  function handleLikeClick() {
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