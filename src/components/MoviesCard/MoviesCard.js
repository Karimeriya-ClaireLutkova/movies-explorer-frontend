import React from 'react';
import { useLocation } from 'react-router-dom';
import { urlBeginning } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({userData, movie, onMovieLike, onMovieDelete}) {
  const { pathname } = useLocation();
  const [isOwner, setOwner] = React.useState(false);
  const cardLikeButtonClassName = `element__button element__button_like ${isOwner ? "element__button_like_active" : ""}`;
  const {url} = movie.image;
  const urlFull = `${urlBeginning}${url}`;

  React.useEffect(() => {
    if( movie.owner === '') {
      setOwner(false);
    } else if(movie.owner === userData._id) {
      setOwner(true);
    }
  }, [userData._id, movie, movie.owner])

  function handleLikeClick() {
    onMovieLike(movie, userData);
  }

  function handleDeleteClick() {
    onMovieDelete(movie, userData);
  }

  return (
    <div className="element">
      <img className="element__image" src={urlFull} alt={`Постер к фильму ${movie.nameRU}`} />
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