import React from 'react';
import moviesApi from '../../utils/MoviesApi.js';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, filtersShortFilm } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ moviesAll, onMoviesAll, moviesSaved, onMovieLike, loggedIn, onAuthorization, onNavigation, onActiveMenu, isLoad, onInputLanguage }) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const moviesStorage = localStorage.getItem("moviesScreach");
  const moviesScreachCurrent = JSON.parse(moviesStorage);
  const textScreachCurrent = localStorage.getItem("textScreach");
  const [moviesList, setMoviesList] = React.useState([]);
  const [moviesListSaved, setMoviesListSaved] = React.useState(moviesSaved);
  const [isLoader, setLoader] = React.useState(false);
  const [counterMovies, setCounterMovies] = React.useState();
  const initialCounter = 0;
  const [counterMoviesNew, setCounterMoviesNew] = React.useState();
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [moviesListNew, setMoviesListNew] = React.useState([]);
  const [isErrorActive, setErrorActive] = React.useState(false);
  const [isButtonInactive, setButtonInactive] = React.useState(true);
  const [isNotFoundMovies, setNotFoundMovies] = React.useState(false);
  const [textInput, setTextInput] = React.useState('');
  const [initialMovies, setInitialMovies] = React.useState([]);

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
    let resizeTimeout;
    function resizeHandler() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function(){
        handleResize();
      }, 1000)
    }
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [windowDimensions]);

  React.useEffect(() => {
    function runOnlyPageLoad() {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
      setCounterMoviesNew();
    }
    runOnlyPageLoad();
  }, [windowDimensions]);

  React.useEffect(() => {
    setLoader(isLoad)
  }, [isLoad]);

  React.useEffect(() => {
    setMoviesList(moviesAll)
  }, [moviesAll]);

  React.useEffect(() => {
    setMoviesListSaved(moviesSaved);
  }, [moviesSaved]);

  React.useEffect(() => {
    if(moviesSaved !== undefined) {
      const cardsMoviesStorageLike = throughIterateArray(moviesListNew);
      setMoviesListNew(cardsMoviesStorageLike);
    }
  }, [moviesSaved]);

  React.useEffect(() => {
    restoreCheckboxState();
  }, []);

  React.useEffect(() => {
    let initialCardsMovies = [];
    let moviesFilter = [];
    if(counterMoviesNew === undefined) {
      if(moviesListNew.length > 0) {
        initialCardsMovies = handleMoviesFilter(moviesListNew, isActiveFilter);
        moviesFilter = handleDisplayPart(initialCardsMovies);
      }
    } else {
      const counterCurrent = handleCounterWidth(windowDimensions);
      initialCardsMovies = handleMoviesFilter(moviesListNew, isActiveFilter);
      if(counterCurrent !== counterMovies) {
        if(counterMoviesNew < counterCurrent) {
          if(initialCardsMovies.length > counterMoviesNew) {
            moviesFilter = initialCardsMovies.slice(initialCounter, counterMoviesNew);
            setButtonInactive(false);
          } else {
            moviesFilter = initialCardsMovies;
            setButtonInactive(true);
          }
        } else {
          if(initialCardsMovies.length > counterCurrent) {
            moviesFilter = initialCardsMovies.slice(initialCounter, counterCurrent);
            setButtonInactive(false);
          } else {
            moviesFilter = initialCardsMovies;
            setButtonInactive(true);
          }
        }
      } else {
        if(initialCardsMovies.length > counterMoviesNew) {
          moviesFilter = initialCardsMovies.slice(initialCounter, counterMoviesNew);
          setButtonInactive(false);
        } else {
          moviesFilter = initialCardsMovies;
          setButtonInactive(true);
        }
      }
    }
    setInitialMovies(moviesFilter);
  }, [moviesListNew, counterMovies, counterMoviesNew, windowDimensions, isActiveFilter]);

  React.useEffect(() => {
    if(loggedIn) {
      if (moviesStorage) {
        setLoader(true);
        handleMoviesAll();
        const restoreDataHistory = () => {
          setActiveFilter(restoreCheckboxState());
          setTextInput(textScreachCurrent);
          const cardsMoviesStorageLike = throughIterateArray(moviesScreachCurrent);
          setMoviesListNew(cardsMoviesStorageLike);
          const movieListStorageNew = handleMoviesFilter(cardsMoviesStorageLike, restoreCheckboxState());
          const resultNew = checkAvailabilityResult(movieListStorageNew);
          if (resultNew) {
            const initialCardsMovies = handleDisplayPart(movieListStorageNew);
            setInitialMovies(initialCardsMovies);
            setLoader(false);
          } else {
            setNotFoundMovies(true);
            setButtonInactive(true);
            setLoader(false);
          }
        }
        restoreDataHistory();
      }
    }
  }, [loggedIn]);

  function saveData(item, movies) {
    localStorage.setItem("moviesScreach", JSON.stringify(movies));
    localStorage.setItem("textScreach", item);
  }

  function saveCheckboxState() {
    const checkboxes = document.querySelector('input[type="checkbox"]');
    let checkboxState = {};
    checkboxState = {
      checked: checkboxes.checked
    };
    localStorage.setItem("filter", JSON.stringify(checkboxState));
  }

  function restoreCheckboxState() {
    const checkboxCurrent = localStorage.getItem("filter");
    const checkbox = JSON.parse(checkboxCurrent);
    if (checkbox) {
      const checkboxNew = document.querySelector('input[type="checkbox"]');
      checkboxNew.checked = checkbox.checked;
      return checkbox.checked;
    }
  }

  function throughIterateArray(items) {
    let listMoviesLike;
    if (moviesListSaved.length > 0) {
      listMoviesLike = items.map(item => checkMoviesLike(item));
    } else {
      listMoviesLike = items;
    }
    return listMoviesLike;
  }

  function checkAvailabilityResult(item) {
    if (item.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  function handleMoviesFilter(item, isActiveFilter) {
    let movieListScreachNew;
    if (isActiveFilter) {
      movieListScreachNew = item.filter((movie) =>
        movie.duration <= filtersShortFilm
      )
    } else {
      movieListScreachNew = item;
    }

    return movieListScreachNew;
  }

  function handleDisplayPart(item) {
    let initialCardsMovies = [];
    if (counterMovies === undefined) {
      const counterCurrent = handleCounterWidth(windowDimensions);
      setCounterMovies(counterCurrent);
      if(item.length > counterCurrent) {
        initialCardsMovies = item.slice(initialCounter, counterCurrent);
        setButtonInactive(false);
      } else {
        initialCardsMovies = item;
        setButtonInactive(true);
      }   
    } else {
      if (item.length > counterMovies) {
        initialCardsMovies = item.slice(initialCounter, counterMovies);
        setButtonInactive(false);
      } else {
        initialCardsMovies = item;
        setButtonInactive(true);
      }
    }
    return initialCardsMovies;
  }

  function handleActiveFilter(isActive) {
    setNotFoundMovies(false);
    setActiveFilter(isActive);
    let movies;
    movies = handleMoviesFilter(moviesListNew, isActive);
    const resultNew = checkAvailabilityResult(movies);
    if (resultNew) {
      setInitialMovies(handleDisplayPart(movies));
    } else {
      setNotFoundMovies(true);
      setButtonInactive(true);
    }
  }

  function checkMoviesLike(movie) {
    let card;
    const movieAvailability = moviesSaved.find(i => i.movieId === movie.id);
    if(movieAvailability) {
      moviesSaved.map(item => item.movieId === movie.id ? card = {...movie, owner: item.owner} : '');
    } else {
      card = movie;
    }
    return card;
  }

  function getMoviesAll(movies) {
    onMoviesAll(movies);
  }

  async function handleMoviesAll() {
    setLoader(true);
    try {
      let movies = await moviesApi.getMovies();
      setMoviesList(movies);
      getMoviesAll(movies);
      return movies;
    } catch {
      setErrorActive(true);
    }
  }

  function handleСlearError() {
    setErrorActive('');
  }

  function searchMovies(item, moviesListAll) {
    setLoader(true);
    const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
    let movieListScreach;
    if (checkLanguageRu) {
      movieListScreach = moviesListAll.filter(movie => {
        const nameRu = movie.nameRU.toLowerCase();
        return (nameRu.includes(item.name))
      });
    } else if (checkLanguageEn) {
      movieListScreach = moviesListAll.filter(movie => {
        const nameEn = movie.nameEN.toLowerCase();
        return (nameEn.includes(item.name))
      });
    }
    saveData(item.name, movieListScreach);
    const moviesLike = throughIterateArray(movieListScreach);
    setMoviesListNew(moviesLike);
    const moviesListFilterNew = handleMoviesFilter(moviesLike, isActiveFilter);
    const resultNew = checkAvailabilityResult(moviesListFilterNew);
    if (resultNew) {
      const initialCardsMovies = handleDisplayPart(moviesListFilterNew);
      setInitialMovies(initialCardsMovies);
    } else {
      setNotFoundMovies(true);
      setButtonInactive(true);
    }
    saveCheckboxState();
    setLoader(false);
  }

  async function handleUpdateMoviesList(item) {
    setLoader(true);
    handleСlearError();
    setInitialMovies([]);
    setMoviesListNew([]);
    setNotFoundMovies(false);
    let moviesListAll;
    if(moviesList === undefined || moviesList.length === 0) {
      let promise = new Promise((resolve) => {
        moviesListAll = handleMoviesAll();
        resolve(moviesListAll);
      })
      let movie = await promise;
      searchMovies(item, movie);
    } else {
      moviesListAll = moviesList;
      searchMovies(item, moviesListAll);
    }
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
      let moviesFilter = [];
      moviesFilter = handleMoviesFilter(moviesListNew, isActiveFilter);
      if (counterNew <= moviesFilter.length) {
        const cardsMoviesNew = moviesFilter.slice(countPrimier, counterNew);
        const initialCardsMovies = currentMovies.concat(cardsMoviesNew);
        setInitialMovies(initialCardsMovies);
        setCounterMoviesNew(initialCardsMovies.length);
        setButtonInactive(false);
      } else {
        setInitialMovies(moviesFilter);
        setButtonInactive(true);
      }
    }
  }

  return (
    <>
      <Header id="2" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <div className="movies">
          <SearchForm id="1" textInput={textInput} onUpdateMoviesList={handleUpdateMoviesList} onActiveFilter={handleActiveFilter} isActiveFilterMovies={isActiveFilter} />
          {isLoader ? (
            <Preloader />
          ) : (
            <MoviesCardList id="1" cardsMovies={initialMovies} isErrorActive={isErrorActive} buttonInactive={isButtonInactive} onMovieLike={onMovieLike} onChangeDescription={handleChangeDescription} isNotFoundMovies={isNotFoundMovies}/>
          )}
        </div>
      </main>
    </>
  )
}

export default Movies;