import React from 'react';
import {listValidation} from '../../utils/constants';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidator from '../FormValidator/FormValidator';

export default function Login ({onSubmit, isOpen, onClose, usersBase}) {
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  
  function handleValidateForm(form) {
    if (isOpen) {
      const validationPopupRegister = new FormValidator(listValidation, form);
      validationPopupRegister.enableValidation();
    }   
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(userEmail, password, usersBase);
    setUserEmail('');
    setPassword('');
    onClose();
  }

  return (
    <>
      <Header id="6" />
      <main>
        <PopupWithForm id="3" name="login-user" title="Рады видеть!"
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       buttonText={"Войти"}
                       onValidateForm={handleValidateForm}>
          <div className="popup__field">
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" name="email" value={userEmail} placeholder="Email" onChange={handleChangeEmail} required  />
            <span className="user-email-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className="popup__input popup__input_type_entry" name="password" value={password} placeholder="" onChange={handleChangePassword} required />
            <span className="user-password-input-error popup__input-error"></span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}