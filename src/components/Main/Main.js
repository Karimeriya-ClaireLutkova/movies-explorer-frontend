import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {account, loggedIn, title, onAuthorization} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header id="1" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} />
    <main>
      <Promo></Promo>
     
    </main>
    </>
    
  )
}

export default Main;