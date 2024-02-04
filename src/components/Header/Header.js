import { Link, NavLink, useLocation } from 'react-router-dom';
import logoHeader from '../../images/logo_header.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onAuthorization, onNavigation, onActiveMenu, onResetErrorServer }) {
  const { pathname } = useLocation();
  const className = `header ${((pathname === '/') ? "header_type_main" : "") || ((pathname === '/sign-up' || pathname === '/sign-in') ? "header_type_entry" : "")}`;
 
  function resetErrorServer() {
    onResetErrorServer();
  }

  return (
    <header className={className}>
      { (pathname === '/sign-up' || pathname === '/sign-in' || pathname === '/profile') ? (
        <NavLink className="header__link" to="/" onClick={resetErrorServer}>
          <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader} />
        </NavLink>
      ) : (
        <Link className="header__link" to="/">
          <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader} />
        </Link>
      )}      
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ||  pathname === '/profile') &&
        <Navigation loggedIn={loggedIn}
                    onAuthorization={onAuthorization}
                    onNavigation={onNavigation}
                    onActiveMenu={onActiveMenu} />
      }
    </header>
  )
}

export default Header;