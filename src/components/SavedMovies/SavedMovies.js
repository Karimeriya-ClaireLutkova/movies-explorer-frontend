import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, userData, onMovieDelete, account, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const [loading, setloading] = React.useState(false);

  return (
    <>
      <Header id="3" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <section className="movies">
          <SearchForm />
          {loading ? (
            <Preloader />
          ) : (
            <MoviesCardList id="2" movies={movies} userData={userData} onMovieDelete={onMovieDelete} />
          )}
        </section>  
      </main>
    </> 
  )
}

export default SavedMovies;