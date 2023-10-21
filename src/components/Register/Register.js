import React from 'react';
import {Link} from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Header from '../Header/Header';

export default function Register(props) {
  const {isOpen, onSubmit} = props;
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
      <Header id="2" />
      <PopupWithForm id="2" name="registration-user" title="Добро пожаловать!"
                     isOpen={isOpen}
                     onSubmit={handleSubmit}
                     buttonText={"Зарегистрироваться"}>
        <div className="popup__field">
          <p className="popup__input-text">Имя</p>
          <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" name="email" placeholder="Email" value={userEmail} onChange={handleChangeEmail} required  />
          <span className="user-email-input-error popup__input-error"></span>
        </div>
        <div className="popup__field">
          <p className="popup__input-text">E-mail</p>
          <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" name="email" placeholder="Email" value={userEmail} onChange={handleChangeEmail} required  />
          <span className="user-email-input-error popup__input-error"></span>
        </div>
        <div className="popup__field">
          <p className="popup__input-text">Пароль</p>
          <input id="user-password-input" type="password" className="popup__input popup__input_type_entry" name="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
          <span className="user-password-input-error popup__input-error"></span>
        </div>
        <div className="popup__signin">
          <p className="popup__signin_title">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="popup__signin_link">Войти</Link>
        </div>
      </PopupWithForm>
   </>
  )
}