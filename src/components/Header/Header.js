import logoHeader from '../../images/logo_header.svg';
import Navigation from '../Navigation/Navigation';


function Header(props) {
  const {account, loggedIn, onAuthorization} = props;

  return (
    <header className='header'>
      <a class="header__link" href="/">
        <img className="header__logo" alt="Логотип Movies Explorer" src={logoHeader}/>
      </a>
      <Navigation account={account} loggedIn={loggedIn} onAuthorization={onAuthorization}></Navigation> 
    </header>
  )
}

export default Header;