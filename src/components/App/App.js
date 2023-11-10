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
import moviesApi from '../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
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
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
    };
    tokenCheck();
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
    .then(([user, moviesSaved]) => {
      setCurrentUser(user);
      setMoviesSaved(moviesSaved);
    })
    .catch((err) => {
      console.log(err)
    });  
  }, [loggedIn]);

  React.useEffect(() => {
    if(loggedIn) {
      moviesApi.getMovies().then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }, [loggedIn]);
   

  function handleCloseForm() {
    navigate("/movies", {replace: true});
  }

  function handleRegisterSubmit(name, userEmail, password) {
    register(name, userEmail, password)
      .then((data) => {
        if (data) {
          setRegistrationInfo({infoStatus: "", message:""});
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          handleCloseForm();
        }
      })
      .catch((err) => {
        setRegistrationInfo({infoStatus: false, message: err.message});
      })
  }
  
  function handleLoginSubmit(userEmail, password) {
    authorization(userEmail, password)
      .then((data) => {
        console.log(data);
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        handleCloseForm();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(item) {
    mainApi.editProfileInfo(item.name, item.userEmail)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.error(err)
      });
  }

  function handleMovieLike(movie, userData) {
    const movieInitial = movies.find(i => i.movieId === movie.movieId);
    let cards;
    if (movieInitial.owner === '') {
      cards = movies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: userData._id} : item);
      setMovies(movies);
      setMoviesSaved([movie, ...moviesSaved]); 
    } else {
      cards = movies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: ''} : item);
      const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
      setMovies(cards);
      setMoviesSaved(movieNewList);
    }
  }

  function handleMovieDelete(movie) {
    const movieInitial = movies.find(i => i.movieId === movie.movieId);
    let cards;
    cards = movies.map(item => item.movieId === movieInitial.movieId ? {...item, owner: ''} : item);
    const movieNewList = moviesSaved.filter((item) => item.movieId !== movie.movieId);
    setMovies(cards);
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
      navigationContainer.className += " navigate-container_responsive-active";
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
    if (navigationSection.className === "navigate-autorized navigate-autorized_responsive" && navigationContainer.className === "navigate-container navigate-container_responsive-active" && page.className === "page page_disable-scroll") {
      navigationSection.className = "navigate-autorized";
      navigationContainer.className = "navigate-container";
      page.className = "page";
    }
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
        <Route path="/movies" element={
          <ProtectedRoute component={Movies}
                 movies={movies}
                 userData={userData}
                 onMovieLike={handleMovieLike}
                 loggedIn={loggedIn}
                 onAuthorization={handleProfileNav}
                 onNavigation={handleCloseNavigationBar}
                 onActiveMenu={handleActiveMenu}
          />
        }>
        </Route>
        <Route path="/saved-movies" element={
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
        <Route path="/profile" element={
          <ProtectedRoute component={Profile}
                   loggedIn={loggedIn}
                   onSignOut={signOut}
                   onAuthorization={handleProfileNav}
                   onUpdateUser={handleUpdateUser}
                   onNavigation={handleCloseNavigationBar}
                   onActiveMenu={handleActiveMenu}
          />
        }>
        </Route>
        <Route path="/sign-up" element={
          <Register onSubmit={handleRegisterSubmit} />
        }>
        </Route>
        <Route path="/sign-in" element={
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