import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG } from '../../utils/constants';
import './Movies.css';

function Movies({ movies, userData, onMovieLike, account, loggedIn, onAuthorization, onNavigation, onActiveMenu }) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [isCounterMovies, setCounterMovies] = React.useState([]);
  const [isCounterMoviesNew, setCounterMoviesNew] = React.useState([]);
  const [isMoviesList, setMoviesList] = React.useState([]);
  const [isInitialMovies, setInitialMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
   
  
  function handleCounterWidth(item) {
    let count = [];
    if (item.width < SCREEN_MIN) {
      count.push(0, 5);
    } else if (SCREEN_MIN <= item.width && item.width < SCREEN_MEDIUM) {
      count.push(0, 8);
    } else if (SCREEN_MEDIUM <= item.width && item.width < SCREEN_BIG) {
      count.push(0, 12);
    } else if (SCREEN_BIG <= item.width) {
      count.push(0, 16);
    }
    return count;
  }

  function getWindowDimensions() {
    const width = document.documentElement.clientWidth;
    return {
      width
    };
  }

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  function handleChangeDescription() {
    const arrayFirst = isCounterMovies[0];
    const arrayLast = isCounterMovies[1];
    const arrayLastNew = (arrayLast - arrayFirst)*2;
    const arrayNew = [arrayLast, arrayLastNew];
    setCounterMoviesNew([arrayNew]);
  }
  
  React.useEffect(() => {
    function runOnlyPageLoad() {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
      let initialCardsMovies = [];
      initialCardsMovies = movies.slice(counterCurrent[0], counterCurrent[1]);
      return initialCardsMovies;
    }
    runOnlyPageLoad();
    const initialCardsMovies = runOnlyPageLoad();
    setInitialMovies(initialCardsMovies);    
  }, [movies, windowDimensions])

  return (
    <>
      <Header id="2" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <section className="movies">
          <SearchForm />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList id="1" moviesLeght={movies.length} initialCardsMovies={isInitialMovies} newMovies={isMoviesList} counterMoviesNew={isCounterMoviesNew} userData={userData} onMovieLike={onMovieLike} onDescription={handleChangeDescription} />
          )}     
        </section>
      </main> 
    </>    
  )
}

export default Movies;