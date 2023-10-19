import React from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function MoviesCard({ image, link, name, owner, onCardClick }) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = owner._id === currentUser._id;
  const cardLikeButtonClassName = (`element__button element__button_like ${isLiked && "element__button_like_active"}`);

  return (
    <div className="element">
      <a className="element__link" href={link} target="_blank" rel="noreferrer">
        <img className="element__image" src={image} alt={`Постер к фильму ${name}`} />
      </a>
      <div className="element__description">
        <h3 className="element__title">{name}</h3>
        <div className="element__container-like">
          { pathname === '/movies' ? (
              <button type="button" className={cardLikeButtonClassName} aria-label="Добавить в сохраненные фильмы" onClick={handleLikeClick} />
            ) : (
              <button type="button" className="element__button element__button_delete element__button_delete_active" aria-label="Удалить карточку места" onClick={handleDeleteClick} />              
            )
          }
        </div>
      </div>
    </div>  
  )
}

export default MoviesCard;