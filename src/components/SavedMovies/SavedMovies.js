import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {filtersShortFilm } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onMovieDelete, isLoad, loggedIn, onAuthorization, onNavigation, onActiveMenu, moviesSaved, onInputLanguage}) {
  const [loading, setLoading] = React.useState(false);
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [moviesListNew, setMoviesListNew] = React.useState(moviesSaved);
  const [isNotFoundMovies, setNotFoundMovies] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    setLoading(isLoad)
  }, [isLoad])

  React.useEffect(() => {
    setMoviesListNew(moviesSaved);
  }, [moviesSaved])

  function handleActiveFilter(isActive) {
    setNotFoundMovies(false);
    setActiveFilter(isActive);
    let movies;
    if (isActive) {
      movies = handleMoviesFilter(moviesListNew, isActive);
      setMoviesListNew(movies);
      setMoviesList(moviesListNew);
    } else {
      if (moviesListNew.length > 0) {
        setMoviesListNew(moviesList);
      }      
    }
    setLoading(false);
  }

  function handleMoviesFilter(item, isActiveFilter) {
    setLoading(true);
    setNotFoundMovies(false);
    let movieListScreachNew;
    if (isActiveFilter) {
      movieListScreachNew = item.filter(movie => 
        movie.duration <= filtersShortFilm
      );
      if (movieListScreachNew.length === 0) {
        setNotFoundMovies(true);
      }
    } else {
      movieListScreachNew = item;
    }

    return movieListScreachNew;
  }

  function handleUpdateMoviesList(item, isValid) {
    setLoading(true);
    if (isActiveFilter) {
      const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
      let movieListScreach;
      if (checkLanguageRu) {
        movieListScreach = moviesListNew.filter(movie => {
          const nameRu = movie.nameRU.toLowerCase();
          return (nameRu.includes(item.name))
        });
        if (movieListScreach.length === 0) {
          setNotFoundMovies(true);          
        };
      } else if(checkLanguageEn) {
        movieListScreach = moviesListNew.filter(movie => {
          const nameEn = movie.nameEN.toLowerCase();
          return (nameEn.includes(item.name))
        });
        if (movieListScreach.length === 0) {
          setNotFoundMovies(true);
        };
      }
      setMoviesListNew(movieListScreach);
    } else {
      const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
      let movieListScreach;
      if (checkLanguageRu) {
        movieListScreach = moviesListNew.filter(movie => {
          const nameRu = movie.nameRU.toLowerCase();
          return (nameRu.includes(item.name))
        });
        if (movieListScreach.length === 0) {
          setNotFoundMovies(true);
        };
      } else if(checkLanguageEn) {
        movieListScreach = moviesListNew.filter(movie => {
          const nameEn = movie.nameEN.toLowerCase();
          return (nameEn.includes(item.name))
        });
        if (movieListScreach.length === 0) {
          setNotFoundMovies(true);          
        };
      }
      setMoviesListNew(movieListScreach);
    }
    if (isValid === true && isNotFoundMovies === true) {
      setNotFoundMovies(false);
      setMoviesListNew(moviesSaved);
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