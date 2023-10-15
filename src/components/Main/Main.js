import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {account, loggedIn, title, onAuthorization} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header id="1" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} />
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />

     
    </main>
    </>
    
  )
}

export default Main;