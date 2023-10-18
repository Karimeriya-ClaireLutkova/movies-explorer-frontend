import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import imgAccount from '../../images/img_account.svg';

function Navigation(props) {
  const {account, loggedIn, onAuthorization} = props;

  return (
    {loggedIn} ?
    <nav className='navigate-autorized'>
      <NavLink to='/' className='navigate-autorized__link'>Главная</NavLink>
      <NavLink to='/movies' className='navigate-autorized__link'>Фильмы</NavLink>
      <NavLink to='/saved-movies' className='navigate-autorized__link'>Сохранённые фильмы</NavLink>
      <button type='button' className='navigate-autorized__button' onClick={onAuthorization}>
          <span className=''>{account}</span>
          <img className='navigate-autorized__logo' alt='Иконка аккаунта' src={imgAccount}/>
      </button>    
    </nav>
    :
    <nav className='navigate-access'>
      <Link to='/signup' className='navigate-access__link'>Регистрация</Link>
      <Link to='/signup' className='navigate-access__link'>Войти</Link>
    </nav>
  )
}

export default Navigation;



        
      