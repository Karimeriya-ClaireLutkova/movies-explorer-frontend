import { Link, useLocation } from 'react-router-dom';
import logoHeader from '../../images/logo_header.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';




function Header({account, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const { pathname } = useLocation();
  const className = `header ${(pathname === '/') ? "header_type_main" : ""}`;
  return (
    <header className={className}>
      <Link className="header__link" to="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader} />
      </Link>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ||  pathname === '/profile') && 
        <Navigation account={account}
                    loggedIn={loggedIn}
                    onAuthorization={onAuthorization}
                    onNavigation={onNavigation}
                    onActiveMenu={onActiveMenu} />
      }
    </header>
  )
}

export default Header;