import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies';
import Register from '../Register/Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { initialMoviesCards, SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, SCREEN_MAX } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const [counterMovies, setCounterMovies] = React.useState(0);
  const navigate = useNavigate();

  function useResize () {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [counterMovies, setCounterMovies] = React.useState(0);
    React.useEffect(() => {
      const handleResize = (event) => {
        setWidth(event.target.innerWidth);
        if (width <= SCREEN_MIN) {
          setCounterMovies(5)
        } else if (SCREEN_MIN < width && width <= SCREEN_MEDIUM) {
          setCounterMovies(8)
        } else if (SCREEN_MEDIUM < width && width <= SCREEN_BIG) {
          setCounterMovies(12)
        } else if (SCREEN_MAX <= width && width <= 1440) {
          setCounterMovies(16)
        } else {
          setCounterMovies(20)
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [width]);
  
    return {
      counterMovies      
    }
  }
  

  function handleProfileNav() {
    navigate('/profile', {replace: true});
  }

  return (
   <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <Main loggedIn={loggedIn} account={account} onAuthorization={handleProfileNav}/>
        }>   
        </Route>
        <Route path="movies" element={
          <Movies movies={initialMoviesCards}
                 useResize={useResize}
                 loggedIn={loggedIn}
                 onAuthorization={handleLogoutNav}/>
        }>
        </Route>
        <Route path="saved-movies" element={
          <SavedMovies movies={initialMoviesCards}
                       loggedIn={loggedIn}
                       onAuthorization={handleLogoutNav}
          />
        }>
        </Route>
        <Route path="profile" element={
          <Profile isOpen={isLoginPopupOpen}
                 loggedIn={loggedIn}
                 userData={userData.email}
                 onSubmit={handleLoginSubmit}
                 onClose={closeAllPopups}
                 onAuthorization={handleLogoutNav}
          />
        }>
        </Route>
        <Route path="sign-up" element={
          <Register isOpen={isRegisterPopupOpen} onSubmit={handleRegisterSubmit} />
        }>   
        </Route>
        <Route path="sign-in" element={
          <Login isOpen={isLoginPopupOpen}
                 loggedIn={loggedIn}
                 userData={userData.email}
                 onSubmit={handleLoginSubmit}
                 onClose={closeAllPopups}
                 onAuthorization={handleLogoutNav}
          />
        }>
        </Route>
        <Route path="*" element={
          <NotFoundPage 
          />
        }>
        </Route>
      </Routes>
      <Footer />
    </CurrentUserContext.Provider> 
  );
}

export default App;
