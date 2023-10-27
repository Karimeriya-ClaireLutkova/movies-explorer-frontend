import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ initialCardsMovies, moviesLength, moviesNew, userData, onMovieLike, onMovieDelete, onCangeDescription, counterMoviesNew }) {
  const [buttonActive, setButtonActive] = React.useState(true);
  const [isMoviesList, setMoviesList] =  React.useState([]);
  const className = `movies__button movies__button_type_${buttonActive ? "active" : ""}`;
  const addingCards = initialCardsMovies;
  React.useEffect(() => {
    const moviesCheck = () => {
      if (isMoviesList.length < moviesLength) {
        setButtonActive(true);
        const moviesList = addingCards.concat(moviesNew);
        setMoviesList(moviesList);
      } else if (isMoviesList.length >= moviesLength) {
        setButtonActive(false)
      }
    };
    moviesCheck();
  }, [moviesNew, moviesLength, isMoviesList, addingCards ]);

  return (
    <section className="elements" aria-label="Список фильмов">
      {initialCardsMovies.map((movie, i) => (
        <MoviesCard key={movie.movieId} userData={userData} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
      ))}
      <div className="movies__container">
        <button className={className} type="button" onClick={onCangeDescription}>Ещё</button>
      </div>  
    </section>    
  )
}

export default MoviesCardList;