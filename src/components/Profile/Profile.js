import React from 'react';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator';
import useErrorsServer from '../../hooks/useErrorsServer';
import { conflictError } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import './Profile.css';

export default function Profile({onSignOut, onUpdateUser, loggedIn, onAuthorization, onNavigation, onActiveMenu, error, isLoad, onСlearError}) {
  const currentUser = React.useContext(CurrentUserContext);
  const userNameLocalStorage = localStorage.getItem("userName");
  const { pathname } = useLocation();
  const [isActive, setActive] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameCurrent, setNameCurrent] = React.useState('');
  const [emailCurrent, setEmailCurrent] = React.useState('');
  const { errors, isValidCurrent, handleChange, resetForm } = useFormValidator();
  const { messageError, handleErrorsStatus, resetError } = useErrorsServer();
  const greeting = `Привет, ${ userNameLocalStorage ? userNameLocalStorage : currentUser.name }!`;

  React.useEffect(() => {
    handleErrorsStatus(error, pathname);
  }, [handleErrorsStatus, error, pathname]);

  React.useEffect(() => {
    if(messageError === conflictError) {
      setName('');
      setEmail('');
      setNameCurrent(currentUser.name);
      setEmailCurrent(currentUser.email);
    }
  }, [messageError, currentUser.name, currentUser.email]);

  React.useEffect(() => {
    setNameCurrent(currentUser.name);
    setEmailCurrent(currentUser.email);
  }, [currentUser]);

  function handleEditProfile() {
    resetErrorServer();
    setDisabled(false);
    setActive(true);
  }

  function resetErrorServer() {
    onСlearError();
    resetError();
  }

  function handleKeyDown(evt) {
    if(evt.key === 'Enter') {
      evt.preventDefault();
    };
  }

  function handleChangeInput(evt) {
    resetErrorServer();
    handleChange({event: evt, pathname: pathname, currentUser: currentUser});
    if(evt.target.name === 'name') {
      setNameCurrent('');
      setName(evt.target.value);
    } else if(evt.target.name === 'email') {
      setEmailCurrent('');
      setEmail(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const nameUser = name ? name : nameCurrent;
    const emailUser = email ? email : emailCurrent;
    onUpdateUser({
      name: nameUser,
      email: emailUser,
    });
    setNameCurrent('');
    setEmailCurrent('');
    resetForm();
    setActive(false);
    setDisabled(true);
  }

  return (
    <>
      <Header id="4" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <PopupWithForm id="1" name="profile-info" title={greeting}
                       onSubmit={handleSubmit}
                       buttonText={"Сохранить"}
                       isActive={isActive}
                       isValid={isValidCurrent}
                       errorServer={messageError}
                       isLoad={isLoad}
                       textLoad={"Сохранение..."}>
        <>
          <div className="popup__field popup__field_profile-info">
            <p className="popup__input-text popup__input-text_profile">Имя</p>
            <div className={`popup__data-input ${errors.name ? "popup__data-input_error" : ""}`}>
              <input id="profile-name-input" type="text" className={`popup__input popup__input_profile-info ${errors.name ? "popup__input_error" :""}`} name="name" placeholder="Имя" value={nameCurrent ? nameCurrent : name} onChange={handleChangeInput} onKeyDown={handleKeyDown} autoComplete="off" disabled={isDisabled ? true : ''} required />
              <span className={`profile-name-input-error popup__input-error ${errors.name ? "popup__input-error_active_profile" : ""}`}>{errors.name}</span>
            </div>
          </div>
          <div className="popup__field popup__field_profile-info popup__field_not-underlined">
            <p className="popup__input-text popup__input-text_profile">E-mail</p>
            <div className={`popup__data-input ${errors.email ? "popup__data-input_error" : ""}`}>
              <input id="profile-email-input" type="email" className={`popup__input popup__input_profile-info ${errors.email ? "popup__input_error" :""}`} name="email" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" placeholder="Email" value={emailCurrent ? emailCurrent : email} onChange={handleChangeInput} onKeyDown={handleKeyDown} autoComplete="off" disabled={isDisabled ? true : ''} required />
              <span className={`profile-email-input-error popup__input-error ${errors.email ? "popup__input-error_active_profile" : ""}`}>{errors.email}</span>
            </div>
          </div>
        </>
        <>
          <div className={`popup-editing ${isActive ? "popup-editing_hide" : "popup-editing_show"}`}>
            <button type="button" className={`popup__button popup__button_profile-info ${isActive ? "popup__button_hide" : "popup__button_show"}`} onClick={handleEditProfile}>Редактировать</button>
            <button type="button" className={`popup__button popup__button_profile-info popup__button_signOut ${isActive ? "popup__button_hide" : "popup__button_show"}`} onClick={onSignOut}>Выйти из аккаунта</button>
          </div>
        </>
        </PopupWithForm>
      </main>
   </>
  )
}