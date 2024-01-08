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
    const cardsMoviesStorageLike = throughIterateArray(moviesListNew);
    setMoviesListNew(cardsMoviesStorageLike);
    if(isActiveFilter === true) {
      const moviesFilter = handleMoviesFilter(cardsMoviesStorageLike, isActiveFilter);
      setInitialMovies(moviesFilter);
      console.log(moviesFilter);
    }
  }, [moviesSaved]);

  React.useEffect(() => {
    restoreCheckboxState();
  }, []);

  React.useEffect(() => {
    let initialCardsMovies = [];
    if(counterMoviesNew === undefined) {
      if(moviesListNew.length > 0) {
        initialCardsMovies = handleDisplayPart(moviesListNew);
      }
    } else {
      const counterCurrent = handleCounterWidth(windowDimensions);
      if(counterCurrent !== counterMovies) {
        if(counterMoviesNew < counterCurrent) {
          if(moviesListNew.length > counterMoviesNew) {
            initialCardsMovies = moviesListNew.slice(initialCounter, counterMoviesNew);
            setButtonInactive(false);
          } else {
            initialCardsMovies = moviesListNew;
            setButtonInactive(true);
          }
        } else {
          if(moviesListNew.length > counterCurrent) {
            initialCardsMovies = moviesListNew.slice(initialCounter, counterCurrent);
            setButtonInactive(false);
          } else {
            initialCardsMovies = moviesListNew;
            setButtonInactive(true);
          }
        }
      } else {
        if(moviesListNew.length > counterMoviesNew) {
          initialCardsMovies = moviesListNew.slice(initialCounter, counterMoviesNew);
          setButtonInactive(false);
        } else {
          initialCardsMovies = moviesListNew;
          setButtonInactive(true);
        }
      }
    }
    if(isActiveFilter === true) {
      const moviesFilter = handleMoviesFilter(initialCardsMovies, isActiveFilter);
      setInitialMovies(moviesFilter);
      console.log(moviesFilter);
    } else {
      setInitialMovies(initialCardsMovies);
    }
  }, [moviesListNew, counterMovies, counterMoviesNew, windowDimensions]);

  /*React.useEffect(() => {
    if(loggedIn) {
      if (moviesStorage) {
        setLoader(true);        
        setActiveFilter(restoreCheckboxState());
        setTextInput(textScreachCurrent);
        if (moviesListSaved.length > 0) {
          let cardsMoviesStorageLike;
          cardsMoviesStorageLike = moviesScreachCurrent.map(item => checkMoviesLike(item));
          if (cardsMoviesStorageLike.length === 0) {
            setNotFoundMovies(true);
          } else {
            setMoviesListNew(cardsMoviesStorageLike);
            const movieListStorageNew = handleMoviesFilter(cardsMoviesStorageLike, restoreCheckboxState());
            if (movieListStorageNew.length === 0) {
              setNotFoundMovies(true);
            } else {
              const initialCardsMovies = handleDisplayPart(movieListStorageNew);
              setInitialMovies(initialCardsMovies);
            }
          }
        } else {
          setMoviesListNew(moviesScreachCurrent);
          const movieListStorageNew = handleMoviesFilter(moviesScreachCurrent, restoreCheckboxState());
          if (movieListStorageNew.length === 0) {
            setNotFoundMovies(true);
          } else {
            const initialCardsMovies = handleDisplayPart(movieListStorageNew);
            setInitialMovies(initialCardsMovies);
          }
        }
      }
      setLoader(false);
    }      
  }, [loggedIn, moviesListSaved]);
  
  React.useEffect(() => {
    if(loggedIn) {
      if (moviesStorage) {
        const restoreDataHistory = () => {
          setLoader(true);        
          setActiveFilter(restoreCheckboxState());
          setTextInput(textScreachCurrent);
          const cardsMoviesStorageLike = throughIterateArray(moviesScreachCurrent);
          setMoviesListNew(cardsMoviesStorageLike);
          const movieListStorageNew = handleMoviesFilter(cardsMoviesStorageLike, restoreCheckboxState());
          const resultNew = checkAvailabilityResult(movieListStorageNew);
          if (resultNew) {
            const initialCardsMovies = handleDisplayPart(movieListStorageNew);
            setInitialMovies(initialCardsMovies);
          } else {
            setNotFoundMovies(true);
          }
        }
        restoreDataHistory();
        setLoader(false);
      }
    }      
  }, [loggedIn]);*/

  React.useEffect(() => {
    if(loggedIn) {
      if (moviesStorage) {
        setLoader(true);
        const restoreDataHistory = () => {
          setLoader(true);
          setActiveFilter(restoreCheckboxState());
          setTextInput(textScreachCurrent);
          const cardsMoviesStorageLike = throughIterateArray(moviesScreachCurrent);
          setMoviesListNew(cardsMoviesStorageLike);
          const movieListStorageNew = handleMoviesFilter(cardsMoviesStorageLike, restoreCheckboxState());
          const resultNew = checkAvailabilityResult(movieListStorageNew);
          if (resultNew) {
            const initialCardsMovies = handleDisplayPart(movieListStorageNew);
            setInitialMovies(initialCardsMovies);
          } else {
            setNotFoundMovies(true);
          }
        }
        restoreDataHistory();
        setLoader(false);
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

/*
  function saveCheckboxState() {
    const checkboxes = document.querySelector('input[type="checkbox"]');
    let checkboxState = {};
    checkboxState = {
      checked: checkboxes.checked
    };
    localStorage.setItem("filter", JSON.stringify(checkboxState));
  }

  React.useEffect(() => {
    if (localStorage.getItem("moviesScreach")) {
      if (moviesAll.length === 0 || moviesAll === undefined) {
        onMoviesAll();
      }      
      setLoader(true);
      restoreCheckboxState();
      const movies = localStorage.getItem("moviesScreach");
      const moviesScreachCurrent = JSON.parse(movies);
      const textScreachCurrent = localStorage.getItem("textScreach");
      const counter = localStorage.getItem("counterView");
      const {counterMovies, counterMoviesNew } = JSON.parse(counter);
      setTextInput(textScreachCurrent);        
      if (moviesScreachCurrent.length > 0) {
        if (counterMoviesNew > 0) {
          let initialCardsMovies = [];
          initialCardsMovies = moviesScreachCurrent.slice(initialCounter, counterMoviesNew);
          setInitialMovies(initialCardsMovies);
          setCounterMoviesNew(counterMoviesNew);
        } else {
          let initialCardsMovies = [];
          initialCardsMovies = moviesScreachCurrent.slice(initialCounter, counterMovies);
          setInitialMovies(initialCardsMovies);
        }
      }
      setLoader(false);
    }
  }, [isOpen]);

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
  }, [moviesListNew, counterMovies, counterMoviesNew]);
   function handleDisplayPart(item) {
    let initialCardsMovies = [];
    if (item.length > counterMovies && counterMovies !== undefined) {
      initialCardsMovies = item.slice(initialCounter, counterMovies);
      setButtonInactive(false);
    } else if(counterMovies === undefined) {
      const counterCurrent = handleCounterWidth(windowDimensions);
      initialCardsMovies = item.slice(initialCounter, counterCurrent);
      setButtonInactive(false);
    } else {
      initialCardsMovies = item;
      setButtonInactive(true);
    }
    return initialCardsMovies;
  }
  */
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
    setActiveFilter(isActive);
    let movies;
    movies = handleMoviesFilter(moviesListNew, isActive);
    console.log(movies);
    setInitialMovies(handleDisplayPart(movies));
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

  async function handleUpdateMoviesList(item) {
    setLoader(true);
    handleСlearError();
    setInitialMovies([]);
    setMoviesListNew([]);
    setNotFoundMovies(false);
    let promise = new Promise((resolve) => {
      resolve(handleMoviesAll());
    })
    let moviesListAll = await promise;
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
    }
    saveCheckboxState();
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