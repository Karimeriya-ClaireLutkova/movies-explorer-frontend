import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {account, loggedIn, title, onAuthorization} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header id="1" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} />
    <main>
     
    </main>
    </>
    
  )
}

export default Main;