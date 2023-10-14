import React, { Children } from 'react';
import logoHeader from '../../images/logo_header.svg';


function Header(props) {
  const {account, loggedIn, title, onAuthorization} = props;

  return (
    <header className={`header ${loggedIn ? "header_login-active" : ""}`}>
      <a class="header__logo-link" href="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader}/>
      </a>
      < Children ></Children>
      
      <div className=''  
    </header>
  )
}

export default Header;