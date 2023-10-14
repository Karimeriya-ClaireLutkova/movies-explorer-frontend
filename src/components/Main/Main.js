import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {account, loggedIn, title, onAuthorization} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    loggedIn ?
    <>
    <Header id="1" {...props} />
    <Component {...props} /> 
    </>
    : <Navigate to='/sign-up' replace />
    <Header id="1" title="Войти" loggedIn={loggedIn} onAuthorization={onAuthorization} />
    <main>
     
    </main>
    </>
    
  )
}

export default Main;