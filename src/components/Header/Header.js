import logoHeader from '../../images/logo_header.svg';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';


function Header(props) {
  const {account, loggedIn, onAuthorization} = props;
  const { pathname } = useLocation();
  return (
    <header className='header'>
      <a class="header__link" href="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader}/>
      </a>
      { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Navigation account={account} loggedIn={loggedIn} onAuthorization={onAuthorization}></Navigation>
      }
    </header>
  )
}

export default Header;