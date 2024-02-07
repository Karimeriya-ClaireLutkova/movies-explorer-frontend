import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main({ loggedIn, onAuthorization, onNavigation, onActiveMenu}) {

  return (
    <>
    <Header id="1" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
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