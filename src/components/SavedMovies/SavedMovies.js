import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, userData, onMovieDelete, loggedIn, onAuthorization, onNavigation, onActiveMenu, onInputLanguage}) {
  const loading = false;

  function handleActiveFilter(isActive) {
    if (isActive) {
      console.log('Короткометражки');
    } else {
      console.log('Провал');
    }
  }

  function handleUpdateMoviesList() {

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
            <MoviesCardList id="2" cardsMovies={movies} userData={userData} onMovieDelete={onMovieDelete} buttonInactive="" />
          )}
        </div> 
      </main>
    </>
  )
}

export default SavedMovies;