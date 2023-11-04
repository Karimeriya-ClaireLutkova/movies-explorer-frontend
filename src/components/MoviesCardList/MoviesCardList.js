import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cardsMovies, userData, onMovieLike, onMovieDelete, onChangeDescription, buttonInactive }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;
  const { pathname } = useLocation();

  function handleChangeDescription() {
    onChangeDescription(cardsMovies)
  }

  return (
    <section className="elements" aria-label="Список фильмов">
      <div className="elements__container">
        {cardsMovies.map((movie, i) => (
          <MoviesCard key={movie.movieId} userData={userData} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
        ))}
      </div>
      { pathname === '/movies' &&
        <div className="elements-adding">
          <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
        </div>
      }
    </section> 
  )
}

export default MoviesCardList;