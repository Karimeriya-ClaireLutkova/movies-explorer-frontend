import React from 'react';
import {listValidation} from '../../utils/constants';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidator from '../FormValidator/FormValidator';

export default function Register({isOpen, onSubmit}) {
  const [name, setName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleValidateForm(form) {
    if (isOpen) {
      const validationPopupRegister = new FormValidator(listValidation, form);
      validationPopupRegister.checkButtonSubmit();
      validationPopupRegister.enableValidation();           
    }   
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(name, userEmail, password);
    setUserEmail('');
    setPassword('');
    setName('');
  }

  return (
    <>
      <Header id="5" />
      <main>
        <PopupWithForm id="2" name="registration-user" title="Добро пожаловать!"
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       buttonText={"Зарегистрироваться"}
                       onValidateForm={handleValidateForm}>
          <div className="popup__field">
            <p className="popup__input-text">Имя</p>
            <input id="user-name-input" type="text" className="popup__input popup__input_type_entry" name="name" placeholder="Имя" value={name} onChange={handleChangeName} required  />
            <span className="user-name-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" name="email" placeholder="Email" value={userEmail} onChange={handleChangeEmail} required  />
            <span className="user-email-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className="popup__input popup__input_type_entry" name="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
            <span className="user-password-input-error popup__input-error"></span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}