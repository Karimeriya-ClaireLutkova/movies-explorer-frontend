import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import imgAccount from '../../images/img_account.svg';
import dropdownNavBar from '../../images/nav_bar.svg';
import './Navigation.css';

function Navigation({account, loggedIn, onAuthorization, onNavigation}) {
  function handleCloseNavBar() {
    onNavigation();
  }

  return (
    <div className="navigate-autorized__container">
      {loggedIn ? (
        <nav className="navigate-autorized" id="navBar">
          <button onClick={onNavigation} className="navigate-autorized__dropdown">
            <img className="navigate-autorized__icon" alt="Три черты выпадающего списка навигации" src={dropdownNavBar} />
          </button>
          <button type="button" className="navigate-autorized__button navigate-autorized__button_type_close" onClick={handleCloseNavBar}></button>
          <div className="navigate-autorized__list">
            <NavLink to="/" className="navigate-autorized__link navigate-autorized__link_hidden">Главная</NavLink>
            <NavLink to="/movies" className="navigate-autorized__link">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="navigate-autorized__link">Сохранённые фильмы</NavLink>
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



        
      