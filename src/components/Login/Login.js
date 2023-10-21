import React from 'react';
import Header from './Header';
import PopupWithForm from './PopupWithForm';

export default function Login ({onSubmit, isOpen, onClose}) {
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
    onClose();
  }

  return (
    <>
      <Header id="6" />
      <PopupWithForm id="3" name="login-user" title="Рады видеть!"
                     isOpen={isOpen}
                     onSubmit={handleSubmit}
                     buttonText={"Войти"}>
        <div className="popup__field">
          <input id="user-email-input" type="email" className="popup__input popup__input_type_entry" name="email" value={userEmail} placeholder="Email" onChange={handleChangeEmail} required  />
          <span className="user-email-input-error popup__input-error"></span>
        </div>
        <div className="popup__field">
          <input id="user-password-input" type="password" className="popup__input popup__input_type_entry" name="password" value={password} placeholder="Пароль" onChange={handleChangePassword} required />
          <span className="user-password-input-error popup__input-error"></span>
        </div>
      </PopupWithForm>
   </>
  )
}