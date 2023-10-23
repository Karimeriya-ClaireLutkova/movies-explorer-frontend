import logoHeader from '../../images/logo_header.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';


function Header({account, loggedIn, onAuthorization, onNavigation}) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader} />
      </Link>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ||  pathname === '/profile') && 
        <Navigation account={account}
                    loggedIn={loggedIn}
                    onAuthorization={onAuthorization}
                    onNavigation={onNavigation} />
      }
    </header>
  )
}

export default Header;