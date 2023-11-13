import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {filtersShortFilm } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ onMovieDelete, isLoad, loggedIn, onAuthorization, onNavigation, onActiveMenu, moviesSaved, onInputLanguage}) {
  const [moviesSavedList, setMoviesSavedList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [moviesListNew, setMoviesListNew] = React.useState([]);

  React.useEffect(() => {
    setLoading(isLoad)
  }, [isLoad])

  React.useEffect(() => {
    setMoviesSavedList(moviesSaved);
    setMoviesListNew(moviesSaved);
  }, [moviesSaved, moviesListNew])

  function handleActiveFilter(isActive) {
    setActiveFilter(isActive);
    let movies;
    movies = handleMoviesFilter(moviesSavedList, isActive);
    setMoviesListNew(movies);
  }

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

  function handleUpdateMoviesList(item) {
    setMoviesListNew([]);
    setLoading(true);
    const {checkLanguageRu, checkLanguageEn} = onInputLanguage(item.name);
    let movieListScreach;
    if (checkLanguageRu) {
      movieListScreach = moviesSavedList.filter(movie => {
        const nameRu = movie.nameRU.toLowerCase();
        return (nameRu.includes(item.name))
      })
    } else if(checkLanguageEn) {
      movieListScreach = moviesSavedList.filter(movie => {
        const nameEn = movie.nameEN.toLowerCase();
        return (nameEn.includes(item.name))
      })
    }
    const movieListScreachNew = handleMoviesFilter(movieListScreach, isActiveFilter);
    setMoviesListNew(movieListScreachNew);
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
            <MoviesCardList id="2" cardsMovies={moviesListNew} onMovieDelete={onMovieDelete} buttonInactive="" />
          )}
        </div> 
      </main>
    </>
  )
}

export default SavedMovies;