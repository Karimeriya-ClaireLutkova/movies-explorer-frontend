import logoHeader from '../../images/logo_header.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';


function Header(props) {
  const {account, loggedIn, onAuthorization} = props;
  const { pathname } = useLocation();
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader}/>
      </Link>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Navigation account={account} loggedIn={loggedIn} onAuthorization={onAuthorization}></Navigation>
      }
    </header>
  )
}

export default Header;