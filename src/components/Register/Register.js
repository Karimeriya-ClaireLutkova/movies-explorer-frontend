import React from 'react';
import {listValidation} from '../../utils/constants';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidator from '../../hooks/useFormValidator';
import useErrorsServer from '../../hooks/useErrorsServer';

export default function Register({ onSubmit, isLoad, isError, onСlearError }) {
  const [name, setName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isErrorServer, setErrorServer] = React.useState('');
  const { errors, isValid, handleChange, resetForm } = useFormValidator();
  const { messageError, handleErrorsStatus, resetError } = useErrorsServer();


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
                       onSubmit={handleSubmit}
                       buttonText={"Зарегистрироваться"}
                       isLoad={isLoad}
                       textLoad={"Регистрация..."}>
          <div className="popup__field">
            <p className="popup__input-text">Имя</p>
            <input id="user-name-input" type="text" className="popup__input popup__input_entry" name="name" placeholder="Имя" value={name} onChange={handleChangeName} required  />
            <span className="user-name-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">E-mail</p>
            <input id="user-email-input" type="email" className="popup__input popup__input_entry" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" name="email" placeholder="Email" value={userEmail} onChange={handleChangeEmail} required  />
            <span className="user-email-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">Пароль</p>
            <input id="user-password-input" type="password" className="popup__input popup__input_entry" name="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
            <span className="user-password-input-error popup__input-error"></span>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}