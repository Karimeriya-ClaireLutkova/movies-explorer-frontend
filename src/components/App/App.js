import React from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Main from '../Main/Main';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [account, setAccount] = React.useState('');
  const navigate = useNavigate();

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
        <Route path="sign-up" element={
          <Register isOpen={isRegisterPopupOpen}
                    loggedIn={loggedIn}
                    onSubmit={handleRegisterSubmit}
                    onClose={closeAllPopups}
                    onAuthorization={handleLoginNav}
          />
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
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
      <Footer />
    </CurrentUserContext.Provider> 
  );
}

export default App;
