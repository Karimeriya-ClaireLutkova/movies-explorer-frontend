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
  const [isLoad, setLoad] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [userData, setUserData] = React.useState({ name: '', email: '', _id: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registrationInfo, setRegistrationInfo] = React.useState({infoStatus: "", message:""});
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const [isError, setError] = React.useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const tokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          setLoad(true);
          getContent(jwt)
            .then((res) => {
              const data = res;
              setUserData({_id: data._id, email: data.email});
              setLoggedIn(true);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setLoad(false);
            })
        }
      }
    };
    tokenCheck();    
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      setLoad(true);
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies(), moviesApi.getMovies()])
        .then(([user, moviesSaved, movie]) => {
          setCurrentUser(user);
          setMoviesSaved(moviesSaved);
          setMovies(movie);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoad(false);
        });
    }
  }, [loggedIn]);
   
  
  React.useEffect(() => {
    
  }, [loggedIn]);
   

  function handleCloseForm() {
    navigate("/movies", {replace: true});
  }

  function handleRegisterSubmit(name, userEmail, password) {
    const passwordUser = password;
    setLoad(true);
    register(name, userEmail, password)
      .then((data) => {
        if (data) {
          setRegistrationInfo({infoStatus: "", message:""});
          handleLoginSubmit(userEmail, passwordUser);
        }
      })
      .catch((err) => {
        setRegistrationInfo({infoStatus: false, message: err.message});
      })
      .finally(() => {
        setLoad(false);
      })      
  }
  
  function handleLoginSubmit(userEmail, password) {
    setLoad(true);
    authorization(userEmail, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        handleCloseForm();
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoad(false)
      });
  }

  function handleUpdateUser(item) {
    setLoad(true);
    mainApi.editProfileInfo(item.name, item.email)
      .then((result) => {
        setUserData({name: result.name, email: result.email, _id: result._id});
        setLoad(true);
        mainApi.getUserInfo()
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setLoad(false);
          });
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoad(false);
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

  function handleСlearError() {
    setError('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <Main loggedIn={loggedIn}
                onAuthorization={handleProfileNav}
                onNavigation={handleCloseNavigationBar}
                onActiveMenu={handleActiveMenu}
                isLoad={isLoad}
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
                 isLoad={isLoad}
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
                       isLoad={isLoad}                
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
                   isError={isError}
                   isLoad={isLoad}
                   onСlearError={handleСlearError}
          />
        }>
        </Route>
        <Route path="/sign-up" element={
          <Register onSubmit={handleRegisterSubmit} />
        }>
        </Route>
        <Route path="/sign-in" element={
          <Login onSubmit={handleLoginSubmit}
                 isError={isError}
                 onСlearError={handleСlearError} />
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