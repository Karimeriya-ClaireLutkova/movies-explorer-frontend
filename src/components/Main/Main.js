import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main(props) {
  const {account, loggedIn, onAuthorization} = props;

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