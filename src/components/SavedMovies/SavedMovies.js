import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, userData, onMovieDelete, account, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const loading = false;

  return (
    <>
      <Header id="3" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <div className="movies">
          <SearchForm id="2" />
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