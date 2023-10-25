import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import imgAccount from '../../images/img_account.svg';
import dropdownNavBar from '../../images/nav_bar.svg';
import './Navigation.css';

function Navigation({account, loggedIn, onAuthorization, onNavigation}) {
  let classNameNavActive = "navigate-autorized__link navigate-autorized__link_type_active";

  return (
    <div className="navigate-autorized__container">
      {loggedIn ? (
        <nav className="navigate-autorized" id="navBar">
          <button onClick={onNavigation} className="navigate-autorized__dropdown">
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
            <div className="navigate-autorized__container-logo">
              <img className="navigate-autorized__logo" alt="Иконка аккаунта" src={imgAccount}/>
            </div>            
          </button>
        </nav>
      ) : (
        <nav className="navigate-access">
          <Link to="/sign-up" className="navigate-access__link">Регистрация</Link>
          <Link to="/sign-in" className="navigate-access__link">Войти</Link>
        </nav>
      )}
    </div>    
  )
}

export default Navigation;



        
      