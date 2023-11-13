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
import { urlBeginning } from '../../utils/constants';
import mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { register, authorization, getContent } from '../../utils/Auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoad, setLoad] = React.useState(false);
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
              setCurrentUser(res);
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
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([user, moviesSaved]) => {
          setCurrentUser(user);
          setMoviesSaved(moviesSaved);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoad(false);
        });
    }
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
          handleLoginSubmit(userEmail, passwordUser);
        }
      })
      .catch((err) => {
        setError(err);
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
      .then(() => {
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

  function handleInputLanguage(item) {
    const checkLanguageRu = new RegExp(/^[а-яёА-ЯЁ]+$/).test(item);
    const checkLanguageEn = new RegExp(/^[a-zA-Z]+$/).test(item);
    return {checkLanguageRu, checkLanguageEn}
  }
  
  function handleMovieLike(movie) {
    const movieInitial = moviesSaved.find(i => i._id === movie.id);
    if (movieInitial === undefined) {
      setLoad(true);
      const movieNew = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        image: `${urlBeginning}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${urlBeginning}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      };
      mainApi.addMovie(movieNew)
        .then((newMovie) => {
          setMoviesSaved([newMovie, ...moviesSaved]);
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      setLoad(true);
      mainApi.deleteMovie(movie._id) 
        .then((newMovie) => {
          const movieNewList = moviesSaved.filter((item) => item._id !== newMovie._id);
          setMoviesSaved(movieNewList);
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setLoad(false);
        });
    }
  }

  function handleMovieDelete(movie) {
    setLoad(true);
    mainApi.deleteMovie(movie._id) 
      .then((newMovie) => {
        const movieNewList = moviesSaved.filter((item) => item._id !== newMovie._id);
        setMoviesSaved(movieNewList);
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoad(false);
      });
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
    setCurrentUser({});
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
                 onMovieLike={handleMovieLike}
                 loggedIn={loggedIn}
                 onAuthorization={handleProfileNav}
                 onNavigation={handleCloseNavigationBar}
                 onActiveMenu={handleActiveMenu}
                 isLoad={isLoad}
                 onInputLanguage={handleInputLanguage}
          />
        }>
        </Route>
        <Route path="/saved-movies" element={
          <ProtectedRoute component={SavedMovies}
                       moviesSaved={moviesSaved}
                       onMovieDelete={handleMovieDelete}
                       loggedIn={loggedIn}
                       onAuthorization={handleProfileNav}
                       onNavigation={handleCloseNavigationBar}
                       onActiveMenu={handleActiveMenu}
                       isLoad={isLoad}
                       onInputLanguage={handleInputLanguage}               
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
          <Register onSubmit={handleRegisterSubmit}
                    isError={isError} 
                    onСlearError={handleСlearError} />
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