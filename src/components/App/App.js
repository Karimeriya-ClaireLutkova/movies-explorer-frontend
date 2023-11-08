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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { register, authorization, getContent } from '../../utils/Auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [userData, setUserData] = React.useState({ name: '', email: '', _id: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registrationInfo, setRegistrationInfo] = React.useState({infoStatus: "", message:""});
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const tokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        if (jwt) { 
          getContent(jwt)
            .then((res) => {
              const data = res;
              setUserData({_id: data._id, email: data.email});
              setLoggedIn(true);
              navigate('/movies', { replace: true });
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
    };
    tokenCheck();
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
    .then(([user, movies]) => {
      setCurrentUser(user);
      setMovies(movies.reverse());
    })
    .catch((err) => {
      console.log(err)
    });  
  }, [navigate, loggedIn]); 

  function handleCloseRegistration() {
    navigate("/sign-in", {replace: true});
  }

  function handleRegisterSubmit(item) {
    setUserData({ name: item.name, email: item.email });
    handleCloseRegistration();
  }
  
  function handleLoginSubmit(userEmail, password) {
    authorization(userEmail, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch(err => console.log(err));
  }

  /*function handleСheckAuthorization(item) {
    localStorage.setItem('jwt', JWT);
    const jwt = localStorage.getItem('jwt');
    setUserData({ name: "Виталий", email: item.email, jwt: jwt});
    navigate('/movies', { replace: true });
    
    setLoggedIn(true);
  }*/

  function handleRegisterSubmit(userEmail, password) {
    register(userEmail, password)
      .then((data) => {
        if (data) {
          setRegistrationInfo({infoStatus: true, message:"Вы успешно зарегистрировались!"});
        }
      })
      .catch(() => {
        setRegistrationInfo({infoStatus: false, message:"Что-то пошло не так! Попробуйте ещё раз."});
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
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
    setUserData({ name: '', email: '', _id: ''});
    navigate('/'); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <Main loggedIn={loggedIn}
                onAuthorization={handleProfileNav}
                onNavigation={handleCloseNavigationBar}
                onActiveMenu={handleActiveMenu}
          />
        }>  
        </Route>
        <Route path="movies" element={
          <ProtectedRoute component={Movies}
                 movies={initialMovies}
                 userData={userData}
                 onMovieLike={handleMovieLike}
                 loggedIn={loggedIn}
                 onAuthorization={handleProfileNav}
                 onNavigation={handleCloseNavigationBar}
                 onActiveMenu={handleActiveMenu}
          />
        }>
        </Route>
        <Route path="saved-movies" element={
          <ProtectedRoute component={SavedMovies}
                       movies={movies}
                       userData={userData}
                       onMovieDelete={handleMovieDelete}
                       loggedIn={loggedIn}
                       onAuthorization={handleProfileNav}
                       onNavigation={handleCloseNavigationBar}
                       onActiveMenu={handleActiveMenu}                 
          />
        }>
        </Route>
        <Route path="profile" element={
          <ProtectedRoute component={Profile}
                   loggedIn={loggedIn}
                   userData={userData}
                   onSubmit={handleСheckAuthorization}
                   onSignOut={signOut}
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
          <Login onSubmit={handleLoginSubmit} />
        }>
        </Route>
        <Route path="*" element={
          <NotFoundPage onBack={handleGoBackPageNav} />
        }>
        </Route>
      </Routes>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer /> }
    </CurrentUserContext.Provider>
  )
}

export default App;