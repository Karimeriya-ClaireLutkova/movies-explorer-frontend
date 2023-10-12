import React from 'react';
import logoHeader from '../../images/logo_header.svg';
import imgAccount from '../../images/img_account.svg';

function Header(props) {
  const {account, loggedIn, title, onAuthorization} = props;

  return (
    <header className={`header ${loggedIn ? "header_login-active" : ""}`}>
      <a class="header__logo-link" href="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader}/>
      </a>
      <div className={`header__info ${loggedIn ? "header__info_login-active" : ""}`}>
        <button className={`header__account ${loggedIn ? "header__account_active" : ""}`}>
          <span className="">{account}</span>
          <img className="header__logo" alt="Иконка аккаунта" src={imgAccount}/>
        </button>
        <button type="button" className="header__button" onClick={onAuthorization}>{title}</button>
      </div>     
    </header>
  )
}

export default Header;