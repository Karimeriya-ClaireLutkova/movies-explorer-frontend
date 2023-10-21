import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, useResize }) {
  const length = movies.length;
  const { counterMovies } = useResize();
  const [initialDisplay, setInitialDisplay] = React.useState(0);
  const [counterMoviesNew, setCounterMoviesNew] = React.useState(counterMovies);
  const [moviesList, setMoviesList] = React.useState();
  const [buttonActive, setButtonActive] = React.useState(true);
  const [loading, setloading] = React.useState(false);
  const className = `movies__button movies__button_type_${buttonActive ? "active" : ""}`;
  function handleChangeDescription() {
    setCounterMoviesNew(counterMoviesNew + counterMovies);
    setInitialDisplay(initialDisplay + counterMovies);
  }

  React.useEffect(() => {
    const moviesCheck = () => {
      if (initialDisplay < length) {
        setloading(true);
        setMoviesList(movies.slice(initialDisplay, counterMoviesNew))
      } else if (initialDisplay >= length) {
        setButtonActive(false)
      }
      setloading(false);
    };
    moviesCheck();
  }, [initialDisplay, counterMoviesNew, counterMovies, movies, length]);

  return (
    <section className="movies">
      <SearchForm />
      {loading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={moviesList} />
      )}
      <div className="movies__container">
        <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
      </div>
      
    </section>    
  )
}

export default Movies;