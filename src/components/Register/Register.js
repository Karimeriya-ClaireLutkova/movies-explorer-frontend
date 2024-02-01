import React from 'react';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidator from '../../hooks/useFormValidator';
import useErrorsServer from '../../hooks/useErrorsServer';
import { useLocation } from 'react-router-dom';

export default function Register({ onSubmit, isLoad, error, onСlearError }) {
  const { pathname } = useLocation();
  const [name, setName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorServer, setErrorServer] = React.useState('');
  const [isActiveError, setActiveError] = React.useState(false);
  const [errorsCurrent, setErrorsCurrent] = React.useState({});
  const { errors, isValidCurrent, handleChange, resetForm } = useFormValidator(errorsCurrent);
  const { messageError, handleErrorsStatus, resetError } = useErrorsServer();

  React.useEffect(() => {
   setErrorsCurrent(errors);
  }, [errors]);
  
  React.useEffect(() => {
    setErrorServer(error);
    handleErrorsStatus(errorServer, pathname);
  }, [handleErrorsStatus, error, errorServer, pathname]);

  React.useEffect(() => {
    if(messageError === "Пользователь с таким email уже существует.") {
      setActiveError(true);
    }
  }, [messageError]);

  function resetErrorServer() {
    onСlearError();
    resetError();
  }

  function handleChangeInput(evt) {
    setActiveError(false);
    const target = evt.target;
    const name = target.name;
    setErrorsCurrent({...errorsCurrent, [name]: ''});
    handleChange(evt);
    if(evt.target.name === 'email') {
      setUserEmail(evt.target.value);
    } else if(evt.target.name === 'password') {
      setPassword(evt.target.value);
    } else if(evt.target.name === 'name') {
      setName(evt.target.value);
    }
  }

  function handleKeyDown(evt) {
    if(evt.key === 'Enter') {
      evt.preventDefault();
    };
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('ggg');
    onSubmit(name, userEmail, password);
    if(errors === undefined) {
      setUserEmail('');
      setPassword('');
      setName('');
    }
    resetForm();
  }

  return (
    <>
      <Header id="5" />
      <main>
        <PopupWithForm id="2" name="registration-user" title="Добро пожаловать!"
                       onSubmit={handleSubmit}
                       buttonText={"Зарегистрироваться"}
                       isLoad={isLoad}
                       isValid={isValidCurrent}
                       errorServer={messageError}
                       onResetErrorServer={resetErrorServer}
                       textLoad={"Регистрация..."}>
          <div className={`popup__field ${errors.name ? "popup__field_error" : ""}`}>
            <p className="popup__input-text">Имя</p>
            <input id="user-name-input" type="text" className={`popup__input popup__input_entry ${errors.name ? "popup__input_error" :""}`} name="name" placeholder="Имя" value={name} onChange={handleChangeInput} autoComplete="off" onKeyDown={handleKeyDown} required />
            <span className={`user-name-input-error popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>{errors.name}</span>
          </div>
          <div className={`popup__field ${errors.email ? "popup__field_error" : ""}`}>
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className={`popup__input popup__input_entry ${(errors.email || isActiveError) ? "popup__input_error" :""}`} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" name="email" placeholder="Email" value={userEmail} onChange={handleChangeInput} autoComplete="off" onKeyDown={handleKeyDown} required />
            <span className={`user-email-input-error popup__input-error ${errors.email ? "popup__input-error_active" : ""}`}>{errors.email}</span>
          </div>
          <div className={`popup__field ${errors.password ? "popup__field_error" : ""}`}>
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className={`popup__input popup__input_entry ${errors.password ? "popup__input_error" :""}`} name="password" placeholder="Пароль" value={password} onChange={handleChangeInput} autoComplete="off" onKeyDown={handleKeyDown} required />
            <span className={`user-password-input-error popup__input-error ${errors.password ? "popup__input-error_active" : ""}`}>{errors.password}</span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}