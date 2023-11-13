import React from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, filtersShortFilm } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/MoviesApi.js';
import './Movies.css';

function Movies({ userData, onMovieLike, loggedIn, onAuthorization, onNavigation, onActiveMenu, isLoad, onInputLanguage }) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [moviesAll, setMoviesAll] = React.useState([]);
  const [isLoader, setLoader] = React.useState(false);
  const [isCounterMovies, setCounterMovies] = React.useState();
  const isInitialCounter = 0;
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [isCounterMoviesNew, setCounterMoviesNew] = React.useState();
  const [isInitialMovies, setInitialMovies] = React.useState([]);
  const [isButtonInactive, setButtonInactive] = React.useState(true);

  React.useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMoviesAll(movies)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    setLoader(isLoad)
  }, [isLoad])

  React.useEffect(() => {
    function runOnlyPageLoad() {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
    }
    runOnlyPageLoad();
  }, [windowDimensions])

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

  function handleMoviesFilter(item) {
    let movieListScreachNew;
    if (isActiveFilter) {
      movieListScreachNew = item.filter(movie => 
        movie.duration <= filtersShortFilm
      )
    } else {
      movieListScreachNew = item;
    }   
    return movieListScreachNew;
  }

  function handleDisplayPart(item) {
    let initialCardsMovies = [];
    if (item.length > isCounterMovies) {
      initialCardsMovies = item.slice(isInitialCounter, isCounterMovies);
    } else {
      initialCardsMovies = item;
    }
    return initialCardsMovies;
  }

  function handleActiveFilter(isActive) {
    setActiveFilter(isActive);
  }

  function handleUpdateMoviesList(item) {
    setLoader(true);
    const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
    let movieListScreach;
    if (checkLanguageRu) {
      movieListScreach = moviesAll.filter(movie => {
        const nameRu = movie.nameRU.toLowerCase();
        return (nameRu.includes(item.name))
      })
    } else if(checkLanguageEn) {
      movieListScreach = moviesAll.filter(movie => {
        const nameEn = movie.nameEN.toLowerCase();
        return (nameEn.includes(item.name))
      })
    }
    const movieListScreachNew = handleMoviesFilter(movieListScreach);
    const initialCardsMovies = handleDisplayPart(movieListScreachNew);
    setInitialMovies(initialCardsMovies);
    setLoader(false);
  }
 
  function handleChangeDescription(item) {
    if(isInitialMovies.length > 0) {
      let currentMovies = item;
      const countPrimier = item.length;
      const counterNew = (countPrimier) + 4;
      let cardsMoviesNew = [];
      cardsMoviesNew = isInitialMovies.slice(countPrimier, counterNew);
      const initialCardsMovies = currentMovies.concat(cardsMoviesNew);
      if(initialCardsMovies.length < isInitialMovies.length) {
        setInitialMovies(initialCardsMovies);
        setCounterMoviesNew(initialCardsMovies.length);
        setButtonInactive(false);   
      } else {
        setInitialMovies(item);
        setButtonInactive(true);
      }
    }
  }

  return (
    <>
      <Header id="2" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <div className="movies">
          <SearchForm id="1" onUpdateMoviesList={handleUpdateMoviesList} onActiveFilter={handleActiveFilter} isActiveFilterMovies={isActiveFilter} />
          {isLoader ? (
            <Preloader />
          ) : (
            <MoviesCardList id="1" cardsMovies={isInitialMovies} buttonInactive={isButtonInactive} userData={userData} onMovieLike={onMovieLike} onChangeDescription={handleChangeDescription} />
          )}
        </div>
      </main>
    </> 
  )
}

export default Movies;