import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ userData, image, name, owner, onCardClick, duration }) {
  const { pathname } = useLocation();
  const isLiked  = card.likes.some(i => i._id === userData._id);
  const isOwn = owner._id === userData._id;
  const cardLikeButtonClassName = (`element__button element__button_like ${isLiked && "element__button_like_active"}`);

  return (
    <div className="element">
      <img className="element__image" src={image} alt={`Постер к фильму ${name}`} />
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
        <div>{duration}</div>
      </div>
    </div>  
  )
}

export default MoviesCard;