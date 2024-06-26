import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const {name, title, onSubmit, children, buttonText, isActive, isValid, errorServer, onResetErrorServer, isLoad, textLoad } = props;
  const { pathname } = useLocation();
  const className = `popup popup_${name} popup_opened`;
  const classNameButton = `popup__button popup__button_save popup__button_${name} ${!isValid ? "popup__button_inactive" : ""}`;
  const [isActiveError, setActiveError] = React.useState(false);

  React.useEffect(() => {
    if(errorServer !== '') {
      setActiveError(true);
    } else {
      setActiveError(false);
    }
  }, [errorServer, setActiveError]);

  function resetErrorServer() {
    onResetErrorServer();
  }

  return (
    <div className = {className}>
      <div className={`popup__container popup__container_${name}`}>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <div className="popup__form-info">
            {children}
          </div>
          { pathname === '/profile' ? (
            <>
              <button id="profile-button-submit" type="submit" className={`popup__button popup__button_save ${isActive ? `popup__button_show popup__button_show_${name}` : "popup__button_hide"} ${!isValid ? "popup__button_inactive" : ""}`} disabled={!isValid ? true : ''}>{isLoad ? textLoad: buttonText}</button>
              <p className={`popup__error ${isActiveError ? "popup__error_active popup__error_active_profile" : ""}`}>{errorServer}</p>
           </>
          ) : (
            <>
            <button type="submit" className={classNameButton} disabled={!isValid ? true : ''}>{isLoad ? textLoad : buttonText}</button>
            <p className={`popup__error ${isActiveError ? "popup__error_active" : ""}`}>{errorServer}</p>
            </>
          )}
        </form>
        { pathname === '/sign-up' &&
          <div className={`popup__redirection popup__redirection_${name}`}>
            <p className="popup__title popup__title_redirection">Уже зарегистрированы?</p>
            <NavLink to="/sign-in" className="popup__link" onClick={resetErrorServer}>Войти</NavLink>
          </div>
        }
        { pathname === '/sign-in' &&
          <div className={`popup__redirection popup__redirection_${name}`}>
            <p className="popup__title popup__title_redirection">Ещё не зарегистрированы?</p>
            <NavLink to="/sign-up" className="popup__link" onClick={resetErrorServer}>Регистрация</NavLink>
          </div>
        }
      </div>
    </div>
  )
}

export default PopupWithForm;