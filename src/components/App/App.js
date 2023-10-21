import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies';
import Register from '../Register/Register';
import { initialMoviesCards, SCREEN_MIN, SCREEN_MEDIUM, SCREEN_BIG, SCREEN_MAX } from '../../utils/constants';

function App() {
  const [usersBase, setUsersBase] = React.useState([]);
  const [counterUser, setcounterUser] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const [moviesSaved, setMoviesSaved] = React.useState([]);
  const navigate = useNavigate();
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

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
  function handleCloseRegistration() {
    setRegisterPopupOpen(false)
    setLoginPopupOpen(true);
    navigate("/sign-in", {replace: true});
  }

  function handleRegisterSubmit(name, userEmail, password) {
    setcounterUser(counterUser + 1)
    setUsersBase({ _id: counterUser, name: name, email: userEmail, password: password })
    handleCloseRegistration();
  }

  function handleProfileNav() {
    navigate('/profile', {replace: true});
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setRegisterPopupOpen(false);
    setLoginPopupOpen(false);
  }

  function handleLoginNav() {
    navigate('/sign-in', {replace: true});
  }

  function handleLogoutNav() {
    navigate('/sign-up', {replace: true});
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setLoginPopupOpen(true);
  }

  return (
   <>
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
    </> 
  );
}

export default App;
