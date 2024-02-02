import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { filtersShortFilm } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onMovieDelete, isLoad, loggedIn, onAuthorization, onNavigation, onActiveMenu, moviesSaved, onInputLanguage}) {
  const [loading, setLoading] = React.useState(false);
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [isNotFoundMovies, setNotFoundMovies] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [moviesListNew, setMoviesListNew] = React.useState(moviesSaved);

  React.useEffect(() => {
    setLoading(isLoad)
  }, [isLoad])

  React.useEffect(() => {
    setMoviesListNew(moviesSaved);
  }, [moviesSaved])

  function saveData(item) {
    localStorage.setItem("textScreachSaved", item);
  }

  function handleActiveFilter(isActive) {
    setNotFoundMovies(false);
    setActiveFilter(isActive);
    let movies;
    if(moviesList.length > 0) {
      movies = handleMoviesFilter(moviesList, isActive);
    } else {
      movies = handleMoviesFilter(moviesSaved, isActive);
    }
    const resultNew = checkAvailabilityResult(movies);
    if (resultNew) {
      setMoviesListNew(movies);
    } else {
      setMoviesListNew([]);
      setNotFoundMovies(true);
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

  function checkAvailabilityResult(item) {
    if (item.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  function handleUpdateMoviesList(item) {
    setMoviesListNew([]);
    setLoading(true);
    setNotFoundMovies(false);
    saveData(item.name);
    const itemNew = item.name.toLowerCase();
    const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
    let movieListScreach;
    if (checkLanguageRu) {
      movieListScreach = moviesSaved.filter(movie => {
        const nameRu = movie.nameRU.toLowerCase();
        return (nameRu.includes(itemNew))
      });
      if (movieListScreach.length === 0) {
        setNotFoundMovies(true);
      };
    } else if(checkLanguageEn) {
      movieListScreach = moviesSaved.filter(movie => {
        const nameEn = movie.nameEN.toLowerCase();
        return (nameEn.includes(itemNew))
      });
      if (movieListScreach.length === 0) {
        setNotFoundMovies(true);
      };
    }
    setMoviesList(movieListScreach);
    const moviesListFilterNew = handleMoviesFilter(movieListScreach, isActiveFilter);
    const resultNew = checkAvailabilityResult(moviesListFilterNew);
    if (resultNew) {
      setMoviesListNew(moviesListFilterNew);
    } else {
      setMoviesListNew([]);
      setNotFoundMovies(true);
    }
    setLoading(false);
  }

  return (
    <>
      <Header id="3" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <div className="movies">
          <SearchForm id="2" onUpdateMoviesList={handleUpdateMoviesList} onActiveFilter={handleActiveFilter} />
          {loading ? (
            <Preloader />
          ) : (
            <MoviesCardList id="2" cardsMovies={moviesListNew} onMovieDelete={onMovieDelete} isNotFoundMovies={isNotFoundMovies} />
          )}
        </div>
      </main>
    </>
  )
}

export default SavedMovies;