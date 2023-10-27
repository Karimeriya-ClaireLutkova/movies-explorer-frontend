import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, SCREEN_MAX } from '../../utils/constants';
import './Movies.css';

function Movies({ movies, userData, onMovieLike, account, loggedIn, onAuthorization, onNavigation }) {
  const [isWidthFirst, setWidthFirst] = React.useState(document.documentElement.clientWidth);
  const [isCounterMovies, setCounterMovies] = React.useState([]);
  const [isCounterMoviesNew, setCounterMoviesNew] = React.useState([]);
  const [isMoviesList, setMoviesList] = React.useState([]);
  const [isInitialMovies, setInitialMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isOpen, setOpen] = React.useState(true);
   
  
  function handleCounterWidth(item) {
    let count = [];
    if (item <= SCREEN_MIN) {
      count.push(0, 5);
    } else if (SCREEN_MIN < item && item <= SCREEN_MEDIUM) {
      count.push(0, 8);
    } else if (SCREEN_MEDIUM < item && item <= SCREEN_BIG) {
      count.push(0, 12);
    } else if (SCREEN_MAX <= item && item <= 1440) {
      count.push(0, 16);
    } else {
      count.push(0, 20);
    }

    return count;
  }

  React.useEffect(() => {
    if (isOpen) {
      function runOnlyOnFirstPageLoad() {
        setLoading(isOpen);
        const counterCurrent = handleCounterWidth(isWidthFirst);
        setCounterMovies(counterCurrent);
        let initialCardsMovies = [];
        initialCardsMovies = movies.slice(counterCurrent[0], counterCurrent[1]);
        
        return initialCardsMovies;
      }
      const initialCardsMovies = runOnlyOnFirstPageLoad();
      setInitialMovies(initialCardsMovies);
      setOpen(false);
      setLoading(false);
    }
    
  }, [isOpen, isWidthFirst, movies])

  function handleChangeDescription() {
    const arrayFirst = isCounterMovies[0];
    const arrayLast = isCounterMovies[1];
    const arrayLastNew = (arrayLast - arrayFirst)*2;
    const arrayNew = [arrayLast, arrayLastNew];
    setCounterMoviesNew([arrayNew]);
  } 
  
  React.useEffect(() => {
    const width = document.documentElement.clientWidth;
    function handleInitialMovies() {
      const width = document.documentElement.clientWidth;
      const counterCurrent = handleCounterWidth(width);
      setCounterMovies(counterCurrent);
      let initialCardsMovies = [];
      initialCardsMovies = movies.slice(counterCurrent[0], counterCurrent[1]);
      
      return initialCardsMovies;
    }
    if(width !== isWidthFirst) {
      setLoading(true);
      setInitialMovies([]);
      setInitialMovies(handleInitialMovies());
      setWidthFirst(width);
    }    
    window.addEventListener('resize', handleInitialMovies);
    setLoading(false);
    return () => {
      window.removeEventListener('resize', handleInitialMovies);
      
    };
  }, [ movies, isWidthFirst ]);

  return (
    <>
      <Header id="2" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} />
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