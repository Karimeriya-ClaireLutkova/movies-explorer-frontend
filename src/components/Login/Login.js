import React from 'react';
import {listValidation} from '../../utils/constants';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidator from '../FormValidator/FormValidator';

export default function Login ({onSubmit}) {
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleValidateForm(form) {
    const validationPopupLogin = new FormValidator(listValidation, form);
    validationPopupLogin.enableValidation();
    validationPopupLogin.checkButtonSubmit();
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(userEmail, password);
    setUserEmail('');
    setPassword('');
  }

  return (
    <>
      <Header id="6" />
      <main>
        <PopupWithForm id="3" name="login-user" title="Рады видеть!"
                       onSubmit={handleSubmit}
                       buttonText={"Войти"}
                       onValidateForm={handleValidateForm}>
          <div className="popup__field">
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className="popup__input popup__input_entry" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" name="email" value={userEmail} placeholder="Email" onChange={handleChangeEmail} required  />
            <span className="user-email-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className="popup__input popup__input_entry" name="password" value={password} placeholder="Пароль" onChange={handleChangePassword} required />
            <span className="user-password-input-error popup__input-error"></span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}