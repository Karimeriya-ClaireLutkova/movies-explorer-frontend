import React from 'react';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { initialMoviesCards, JWT } from '../../utils/constants';

function App() {
  const [initialMovies, setInitialMovies] = React.useState(initialMoviesCards);
  const [userData, setUserData] = React.useState({ name: '', email: '', jwt:''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [account, setAccount] = React.useState('Аккаунт');
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const tokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          setLoggedIn(true);
          setUserData({name: 'Виталий', email: 'pochta@yandex.ru', jwt: jwt})
        }
      }
    };
    tokenCheck();
  }, [loggedIn]);

  function handleCloseRegistration() {
    navigate("/sign-in", {replace: true});
  }

  function handleRegisterSubmit(item) {
    setUserData({ name: item.name, email: item.email });
    handleCloseRegistration();
  }

  function handleСheckAuthorization(item) {
    localStorage.setItem('jwt', JWT);
    const jwt = localStorage.getItem('jwt');
    setUserData({ name: "Виталий", email: item.email, jwt: jwt});
    navigate('/movies', { replace: true });
    setAccount('Аккаунт');
    setLoggedIn(true);  
  }

  function handleMovieLike(movie, userData) {
    const movieInitial = initialMovies.find(i => i.movieId === movie.movieId);
    let cards;
    if (movieInitial.owner.jwt === undefined || movieInitial.owner.jwt === '') {
      cards = initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {jwt: userData.jwt}} : item);
      setInitialMovies(cards);
      setMoviesSaved([movie, ...moviesSaved]); 
    } else {
      cards = initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {jwt: ''}} : item);
      const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
      setInitialMovies(cards);
      setMoviesSaved(movieNewList);
    }
  }

  function handleMovieDelete(movie) {
    const movieInitial = initialMovies.find(i => i.movieId === movie.movieId);
    let cards;
    cards = initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {jwt: ''}} : item);
    const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
    setInitialMovies(cards);
    setMoviesSaved(movieNewList);
  }

  function handleProfileNav() {
    navigate('/profile', {replace: true});
    setAccount('Аккаунт');
    setLoggedIn(true);
    handleCloseNavigationBar();
  }

  function handleGoBackPageNav() {
    navigate(-1, {replace: true});
  }

  function handleActiveMenu() {
    const navigationSection = document.querySelector(".navigate-autorized");
    const navigationContainer = document.querySelector(".navigate-container");
    const page = document.querySelector(".page");
    if (navigationSection.className === "navigate-autorized" && navigationContainer.className === "navigate-container" && page.className === "page") {
      navigationSection.className += " navigate-autorized_responsive";
      navigationContainer.className += " navigate-autorized_responsive-active";
      page.className += " page_disable-scroll";
    } else {
      navigationSection.className = "navigate-autorized";
      navigationContainer.className = "navigate-container";
      page.className = "page";
    }
  }

  function handleCloseNavigationBar() {
    const navigationSection = document.querySelector(".navigate-autorized");
    const navigationContainer = document.querySelector(".navigate-container");
    const page = document.querySelector(".page");
    if (navigationSection.className === "navigate-autorized navigate-autorized_responsive" && navigationContainer.className === "navigate-container navigate-autorized_responsive-active" && page.className === "page page_disable-scroll") {
      navigationSection.className = "navigate-autorized";
      navigationContainer.className = "navigate-container";
      page.className = "page";
    }
  }

  function handleUpdateUser(item) {
    setUserData({name: item.name, email: item.email});
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setAccount('');
    setUserData({ name: '', email: ''});
    navigate('/'); 
  }

  return (
   <>
      <Routes>
        <Route path="/" element={
          <Main loggedIn={loggedIn}
                account={account}
                onAuthorization={handleProfileNav}
                onNavigation={handleCloseNavigationBar}
                onActiveMenu={handleActiveMenu}
          />
        }>  
        </Route>
        <Route path="movies" element={
          <Movies movies={initialMovies}
                 userData={userData}
                 onMovieLike={handleMovieLike}
                 loggedIn={loggedIn}
                 account={account}
                 onAuthorization={handleProfileNav}
                 onNavigation={handleCloseNavigationBar}
                 onActiveMenu={handleActiveMenu}
          />
        }>
        </Route>
        <Route path="saved-movies" element={
          <SavedMovies movies={moviesSaved}
                       userData={userData}
                       onMovieDelete={handleMovieDelete}
                       loggedIn={loggedIn}
                       account={account}
                       onAuthorization={handleProfileNav}
                       onNavigation={handleCloseNavigationBar}
                       onActiveMenu={handleActiveMenu}                 
          />
        }>
        </Route>
        <Route path="profile" element={
          <Profile loggedIn={loggedIn}
                   userData={userData}
                   onSubmit={handleСheckAuthorization}
                   onSignOut={signOut}
                   account={account}
                   onAuthorization={handleProfileNav}
                   onUpdateUser={handleUpdateUser}
                   onNavigation={handleCloseNavigationBar}
                   onActiveMenu={handleActiveMenu}
          />
        }>
        </Route>
        <Route path="sign-up" element={
          <Register onSubmit={handleRegisterSubmit} />
        }>
        </Route>
        <Route path="sign-in" element={
          <Login onSubmit={handleСheckAuthorization} />
        }>
        </Route>
        <Route path="*" element={
          <NotFoundPage onBack={handleGoBackPageNav} />
        }>
        </Route>
      </Routes>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer /> }
    </>
  );
}

export default App;