import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import imgAccount from '../../images/img_account.svg';
import dropdownNavBar from '../../images/nav_bar.svg';
import './Navigation.css';

function Navigation({account, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const { pathname } = useLocation();
  const classNameNavActive = "navigate-autorized__link navigate-autorized__link_type_active";

  return (
    <>
      {loggedIn ? (
        <div className="navigate-autorized__container">
          <nav className="navigate-autorized" id="navBar">
            <button onClick={onActiveMenu} className="navigate-autorized__dropdown">
              <img className="navigate-autorized__icon" alt="Три черты выпадающего списка навигации" src={dropdownNavBar} />
            </button>
            <button type="button" className="navigate-autorized__button navigate-autorized__button_type_close" onClick={onNavigation}></button>
            <div className="navigate-autorized__list">
              <NavLink to="/" className={({ isActive }) => isActive ? `${classNameNavActive} navigate-autorized__link_hidden`: "navigate-autorized__link navigate-autorized__link_hidden"} onClick={onNavigation}>Главная</NavLink>
              <NavLink to="/movies" className={({ isActive }) => isActive ? classNameNavActive : "navigate-autorized__link"} onClick={onNavigation} >Фильмы</NavLink>
              <NavLink to="/saved-movies" className={({ isActive }) => isActive ? classNameNavActive : "navigate-autorized__link"} onClick={onNavigation}>Сохраненные фильмы</NavLink>
            </div>          
            <button type="button" className="navigate-autorized__button navigate-autorized__button_type_account" onClick={onAuthorization}>
              <p className="navigate-autorized_text">{account}</p>
              { pathname === '/' ? (
                  <div className="navigate-autorized__container-logo navigate-autorized__container-logo_type_header">
                   <img className="navigate-autorized__logo" alt="Иконка аккаунта" src={imgAccount}/>
                  </div> 
              ) : (
                  <div className="navigate-autorized__container-logo">
                    <img className="navigate-autorized__logo" alt="Иконка аккаунта" src={imgAccount}/>
                  </div>
              )}           
            </button>
          </nav>
        </div>
      ) : (
        <nav className="navigate-access">
          <Link to="/sign-up" className="navigate-access__link">Регистрация</Link>
          <Link to="/sign-in" className="navigate-access__link navigate-access__link_type_entry">Войти</Link>
        </nav>
      )}
    </>    
  )
}

export default Navigation;



        
      