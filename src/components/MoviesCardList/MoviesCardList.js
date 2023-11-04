import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ initialCardsMovies, moviesLength, moviesNew, userData, onMovieLike, onMovieDelete, onChangeDescription, counterMoviesNew }) {
  const [buttonInactive, setButtonInactive] = React.useState(true);
  const [isMoviesList, setMoviesList] =  React.useState([]);
  const className = `elements-adding__button elements-adding__button_type_${buttonInactive ? "inactive" : ""}`;
  const addingCards = initialCardsMovies;
  React.useEffect(() => {
    const moviesCheck = () => {
      if (isMoviesList.length < moviesLength) {
        setButtonInactive(false);
        const moviesList = addingCards.concat(moviesNew);
        setMoviesList(moviesList);
      } else if (isMoviesList.length >= moviesLength) {
        setButtonInactive(true)
      }
    };
    moviesCheck();
  }, [moviesNew, moviesLength, isMoviesList, addingCards ]);

  return (
    <section className="elements" aria-label="Список фильмов">
      <div className="elements__container">
        {initialCardsMovies.map((movie, i) => (
          <MoviesCard key={movie.movieId} userData={userData} movie={movie} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />
        ))}        
      </div>      
      <div className="elements-adding">
        <button className={className} type="button" onClick={onChangeDescription}>Ещё</button>
      </div>  
    </section>    
  )
}

export default MoviesCardList;