import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const {name, isOpen, title, onSubmit, children, buttonText, onValidateForm} = props;
  const { pathname } = useLocation();
  const className = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;
  const classNameButton = `popup__button popup__button_save popup__button_${name}`;

  React.useEffect(() => {
    const form = document.querySelector('[class = "popup__form"]');
    const handleValidateForm = (form) => {
      onValidateForm(form)
    }; 
    handleValidateForm(form);
  }, [onValidateForm]);

  return (
    <div className = {className}>
      <div className={`popup__container ${isOpen ? `popup__container_type_${name}` : ""}`}>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <div className="popup__form-info">
            {children}
          </div>
          <button type="submit" className={classNameButton}>{buttonText}</button>
        </form>
        { pathname === '/sign-up' &&
          <div className="popup__redirection">
            <p className="popup__title_type_redirection">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="popup__link_type_redirection">Войти</Link>
          </div>
        }
        { pathname === '/sign-in' &&
          <div className="popup__redirection">
            <p className="popup__title_type_redirection">Ещё не зарегистрированы?</p>
            <Link to="/sign-up" className="popup__link_type_redirection">Регистрация</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default PopupWithForm;