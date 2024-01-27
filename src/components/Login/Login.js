import React from 'react';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidator from '../../hooks/useFormValidator';
import useErrorsServer from '../../hooks/useErrorsServer';
import { useLocation } from 'react-router-dom';

export default function Login ({ onSubmit, isLoad, error, onСlearError}) {
  const { pathname } = useLocation();
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isActiveError, setActiveError] = React.useState(false);
  const { errors, isValid, handleChange, resetForm } = useFormValidator();
  const { messageError, handleErrorsStatus, resetError } = useErrorsServer();

  React.useEffect(() => {
    handleErrorsStatus(error, pathname);
  }, [handleErrorsStatus, error, pathname]);

  React.useEffect(() => {
    if(messageError === "Вы ввели неправильный логин или пароль.") {
      setActiveError(true);
    }
  }, [messageError]);

  function resetErrorServer() {
    resetError();
  }

  function handleChangeInput(evt) {
    onСlearError();
    resetError();   
    handleChange(evt);
    if(evt.target.name === 'email') {
      setUserEmail(evt.target.value);
    } else if(evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(userEmail, password);
    if(errors === undefined) {
      setUserEmail('');
      setPassword('');
    }
    resetForm();
  }

  return (
    <>
      <Header id="6" />
      <main>
        <PopupWithForm id="3" name="login-user" title="Рады видеть!"
                       onSubmit={handleSubmit}
                       buttonText={"Войти"}
                       isLoad={isLoad}
                       isValid={isValid}
                       errorServer={messageError}
                       onResetErrorServer={resetErrorServer}
                       textLoad={"Вход..."}>
          <div className={`popup__field ${errors.email ? "popup__field_error" : ""}`}>
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className={`popup__input popup__input_entry ${(errors.email || isActiveError) ? "popup__input_error" :""}`} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" name="email" value={userEmail} placeholder="Email" onChange={handleChangeInput} autoComplete="off" required  />
            <span className={`user-email-input-error popup__input-error ${errors.email ? "popup__input-error_active" : ""}`}>{errors.email}</span>
          </div>
          <div className={`popup__field ${errors.password ? "popup__field_error" : ""}`}>
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className={`popup__input popup__input_entry ${(errors.password || isActiveError) ? "popup__input_error" :""}`} name="password" value={password} placeholder="Пароль" onChange={handleChangeInput} autoComplete="off" required />
            <span className={`user-password-input-error popup__input-error ${errors.password ? "popup__input-error_active" : ""}`}>{errors.password}</span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}