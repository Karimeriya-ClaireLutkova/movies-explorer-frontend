import React from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, filtersShortFilm } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ onMoviesAll, moviesAll, onMovieLike, loggedIn, onAuthorization, onNavigation, onActiveMenu, isLoad, onInputLanguage }) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [moviesList, setMoviesList] = React.useState([]);
  const [isLoader, setLoader] = React.useState(false);
  const [counterMovies, setCounterMovies] = React.useState();
  const initialCounter = 0;
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [counterMoviesNew, setCounterMoviesNew] = React.useState();
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [moviesListNew, setMoviesListNew] = React.useState([]);
  const [isButtonInactive, setButtonInactive] = React.useState(true);
  const [isNotFoundMovies, setNotFoundMovies] = React.useState(false);

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
  }, [windowDimensions])

  React.useEffect(() => {
    function runOnlyPageLoad() {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
    }
    runOnlyPageLoad();
  }, [windowDimensions])

  React.useEffect(() => {
    setLoader(isLoad)
  }, [isLoad]);

  React.useEffect(() => {
    setMoviesList(moviesAll)
  }, [moviesAll])

  React.useEffect(() => {
    if(counterMoviesNew === undefined) {
      let initialCardsMovies = [];
      if(moviesListNew.length > 0) {
        initialCardsMovies = moviesListNew.slice(initialCounter, counterMovies);
        setInitialMovies(initialCardsMovies);
      }      
    } else {
      let initialCardsMovies = [];
      initialCardsMovies = moviesListNew.slice(initialCounter, counterMoviesNew);
      setInitialMovies(initialCardsMovies);
    }
  }, [moviesListNew, counterMovies, counterMoviesNew])

  function handleMoviesFilter(item, isActiveFilter) {
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
    if (item.length > counterMovies) {
      initialCardsMovies = item.slice(initialCounter, counterMovies);
      setButtonInactive(false);
    } else {
      initialCardsMovies = item;
      setButtonInactive(true);
    }
    return initialCardsMovies;
  }
  
  function handleActiveFilter(isActive) {
    setActiveFilter(isActive);
    let movies;
    movies = handleMoviesFilter(moviesListNew, isActive);
    setInitialMovies(handleDisplayPart(movies));
  }

  function handleUpdateMoviesList(item) {
    setLoader(true);
    onMoviesAll();
    setMoviesListNew([]);
    setNotFoundMovies(false);    
    const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
    let movieListScreach;
    if (checkLanguageRu) {
      movieListScreach = moviesList.filter(movie => {
        const nameRu = movie.nameRU.toLowerCase();
        return (nameRu.includes(item.name))
      });
      if (movieListScreach.length === 0) {
        setNotFoundMovies(true);
      }
    } else if (checkLanguageEn) {
      movieListScreach = moviesList.filter(movie => {
        const nameEn = movie.nameEN.toLowerCase();
        return (nameEn.includes(item.name))
      });
      if (movieListScreach.length === 0) {
        setNotFoundMovies(true);
      }
    }
    const movieListScreachNew = handleMoviesFilter(movieListScreach, isActiveFilter);
    if (movieListScreachNew.length === 0) {
      setNotFoundMovies(true);
    }
    setMoviesListNew(movieListScreachNew);
    const initialCardsMovies = handleDisplayPart(movieListScreachNew);
    setInitialMovies(initialCardsMovies);
    setLoader(false);
  }
 
  function handleChangeDescription(item) {
    if(initialMovies.length > 0 && moviesListNew.length > 0 && moviesListNew.length > item.length) {
      let currentMovies = item;
      const countPrimier = item.length;
      const width = document.documentElement.clientWidth;
      let counterNew;
      if (width < SCREEN_MIN) {
        counterNew = countPrimier + 2;
      } else if (SCREEN_MIN <= width && width < SCREEN_MEDIUM) {
        counterNew = countPrimier + 2;
      } else if (SCREEN_MEDIUM <= width && width < SCREEN_BIG) {
        counterNew = countPrimier + 3;
      } else if (SCREEN_BIG <= width) {
        counterNew = countPrimier + 4;
      }
      let cardsMoviesNew = [];
      cardsMoviesNew = moviesListNew.slice(countPrimier, counterNew);
      const initialCardsMovies = currentMovies.concat(cardsMoviesNew);
      if(initialCardsMovies.length < moviesListNew.length) {
        setInitialMovies(initialCardsMovies);
        setCounterMoviesNew(initialCardsMovies.length);
        setButtonInactive(false);   
      } else {
        setInitialMovies(moviesListNew);
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
            <MoviesCardList id="1" cardsMovies={initialMovies} buttonInactive={isButtonInactive} onMovieLike={onMovieLike} onChangeDescription={handleChangeDescription} isNotFoundMovies={isNotFoundMovies}/>
          )}
        </div>
      </main>
    </> 
  )
}

export default Movies;