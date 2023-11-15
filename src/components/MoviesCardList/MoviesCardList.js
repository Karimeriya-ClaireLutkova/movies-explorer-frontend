import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { serverErrorMovies, notFoundMovies } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({ cardsMovies, onMovieLike, onMovieDelete, isErrorActive, onChangeDescription, buttonInactive, isNotFoundMovies }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;
  const { pathname } = useLocation();
  const [isNotMovies, setNotMovies] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const textInfo = `${isError ? serverErrorMovies : notFoundMovies}`;

  React.useEffect(() => {
    setNotMovies(isNotFoundMovies);  
  }, [isNotFoundMovies]);

  React.useEffect(() => {
    setError(isErrorActive);
  }, [isErrorActive]);

  function handleChangeDescription() {
    onChangeDescription(cardsMovies)
  }

  return (
    <section className="elements" aria-label="Список фильмов">
      <div className={`elements__container-info ${isNotMovies ? "elements__container-info_active" : ""}`}>
      { pathname === "/movies" ? (
        <p className="elements__text">{textInfo}</p>
      ) : (
        <p className="elements__text">Ничего не найдено.</p>
      )}
      </div>
      <div className={`elements__container ${ pathname === '/saved-movies' ? "elements__container_saved-movies" : ""}`}>
        { pathname === "/movies" && (
          cardsMovies.map((movie, i) => (<MoviesCard id="1" key={movie.id} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />))
        )}
        { pathname === "/saved-movies" && ( 
          cardsMovies.map((movie, i) => (<MoviesCard id="2" key={movie._id} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />))
        )}   
      </div>
      { pathname === "/movies" &&
        <div className="elements-adding">
          <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
        </div>
      }
    </section> 
  )
}

export default MoviesCardList;