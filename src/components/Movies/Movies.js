import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG } from '../../utils/constants';
import './Movies.css';

function Movies({ movies, userData, onMovieLike, account, loggedIn, onAuthorization, onNavigation, onActiveMenu }) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [isCounterMovies, setCounterMovies] = React.useState();
  const isInitialCounter = 0;
  const [isMoviesList, setMoviesList] = React.useState([]);
  const [isInitialMovies, setInitialMovies] = React.useState([]);
  const [isButtonInactive, setButtonInactive] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
   
  
  function handleCounterWidth(item) {
    let count;
    if (item.width < SCREEN_MIN) {
      count = (5);
    } else if (SCREEN_MIN <= item.width && item.width < SCREEN_MEDIUM) {
      count = (8);
    } else if (SCREEN_MEDIUM <= item.width && item.width < SCREEN_BIG) {
      count = (12);
    } else if (SCREEN_BIG <= item.width) {
      count = (16);
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

  function handleChangeDescription(item) {
    let currentMovies = item;
    const countPrimier = item.length;
    const counterNew = (countPrimier)*2;
    let cardsMoviesNew = [];
    cardsMoviesNew = movies.slice(countPrimier, counterNew);
    const initialCardsMovies = currentMovies.concat(cardsMoviesNew);
    setMoviesList(initialCardsMovies);
    if(initialCardsMovies.length < movies.length) {
      setInitialMovies(initialCardsMovies);
      setButtonInactive(false);
    } else {
      setInitialMovies(item);
      setButtonInactive(true);
    }    
  }
  
  React.useEffect(() => {
    function runOnlyPageLoad() {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
      let initialCardsMovies = [];
      initialCardsMovies = movies.slice(isInitialCounter, isCounterMovies);
      return initialCardsMovies;
    }
    runOnlyPageLoad();
    const initialCardsMovies = runOnlyPageLoad();
    setInitialMovies(initialCardsMovies);    
  }, [isInitialCounter, movies, windowDimensions, isCounterMovies])

  return (
    <>
      <Header id="2" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <section className="movies">
          <SearchForm id="1"/>
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList id="1" cardsMovies={isInitialMovies} buttonInactive={isButtonInactive} userData={userData} onMovieLike={onMovieLike} onChangeDescription={handleChangeDescription} />
          )}     
        </section>
      </main> 
    </>    
  )
}

export default Movies;