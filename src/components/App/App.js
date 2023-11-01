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
  const [usersBase, setUsersBase] = React.useState([]);
  const [userData, setUserData] = React.useState({_id: '1', name: 'Виталий', email: 'pochta@yandex.ru'});
  const [counterUser, setcounterUser] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [account, setAccount] = React.useState('Аккаунт');
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(true);
 
  function handleCloseRegistration() {
    setRegisterPopupOpen(false);
    setLoginPopupOpen(true);
    navigate("/sign-in", {replace: true});
  }

  function handleRegisterSubmit(name, userEmail, password) {
    setcounterUser(counterUser + 1)
    setUsersBase({ _id: counterUser, name: name, email: userEmail, password: password })
    handleCloseRegistration();
  }

  function handleСheckAuthorization(usersBase, userEmail, password) {
    const authorization = usersBase.some(i => (i.email === userEmail && i.password === password));
    if (authorization) {
      const user = usersBase.find(i => (i.email === userEmail && i.password === password));
      setUserData({ _id: user._id, name: user.name, email: user.email });
    }
    setLoggedIn(authorization);
  }

  function handleLoginSubmit(userEmail, password, usersBase) {
    handleСheckAuthorization(userEmail, password, usersBase);
    if (loggedIn) {
      localStorage.setItem('jwt', JWT);
      navigate('/movies', { replace: true });
      setAccount('Аккаунт')
    }
  }

  function handleMovieLike(movie, userData) {
    const movieInitial = initialMovies.find(i => i.movieId === movie.movieId);
    if (movieInitial.owner._id === undefined || movieInitial.owner._id === null) {
      setInitialMovies(() => initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {_id: userData._id}} : item));
      setMoviesSaved([movie, ...moviesSaved]);
    } else {
      setInitialMovies(() => initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {_id: ''}} : item));
      const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
      setMoviesSaved(movieNewList);
    }
  }

  function handleMovieDelete(movie) {
    const movieInitial = initialMovies.find(i => i.movieId === movie.movieId);
    setInitialMovies(() => initialMovies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: {_id: ''}} : item));
    const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
    setMoviesSaved(movieNewList);
  }

  function handleProfileNav() {
    navigate('/profile', {replace: true});
    handleCloseNavigationBar();
  }
   
  function handleGoBackPageNav() {
    navigate(-1, {replace: true});
  }

  function handleActiveMenu() {
    const navigationSection = document.querySelector(".navigate-autorized");
    const navigationContainer = document.querySelector(".navigate-autorized__container");
    const page = document.querySelector(".page");
    if (navigationSection.className === "navigate-autorized" && navigationContainer.className === "navigate-autorized__container" && page.className === "page") {
      navigationSection.className += " navigate-autorized_responsive";
      navigationContainer.className += " navigate-autorized_responsive-active";
      page.className += " page_disable-scroll"; 
    } else {
      navigationSection.className = "navigate-autorized";
      navigationContainer.className = "navigate-autorized__container";
      page.className = "page";
    }
  }

  function handleCloseNavigationBar() {
    const navigationSection = document.querySelector(".navigate-autorized");
    const navigationContainer = document.querySelector(".navigate-autorized__container");
    const page = document.querySelector(".page");
    if (navigationSection.className === "navigate-autorized navigate-autorized_responsive" && navigationContainer.className === "navigate-autorized__container navigate-autorized_responsive-active" && page.className === "page page_disable-scroll") {
      navigationSection.className = "navigate-autorized";
      navigationContainer.className = "navigate-autorized__container";
      page.className = "page";
    }
  }

  function handleUpdateUser(item) {
    setUserData(userData => ({...userData, _id: item._id, name: item.name, email: item.email}));
  }
  
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setRegisterPopupOpen(false);
    setLoginPopupOpen(false);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    closeAllPopups();
    setAccount('');
    setUserData({_id: '', name: '', email: ''});
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
          <Movies movies={initialMoviesCards}
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
          <Profile isOpen={isEditProfilePopupOpen}
                 loggedIn={loggedIn}
                 userData={userData}
                 onSubmit={handleLoginSubmit}
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
          <Register isOpen={isRegisterPopupOpen}
                    onSubmit={handleRegisterSubmit}
                    onClose={closeAllPopups}
          />
        }>   
        </Route>
        <Route path="sign-in" element={
          <Login isOpen={isLoginPopupOpen}
                 onSubmit={handleLoginSubmit}
                 onClose={closeAllPopups}
                 usersBase={usersBase}
          />
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
