import React from 'react';
import {listValidation} from '../../utils/constants';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidator from '../FormValidator/FormValidator';
import './Profile.css';

export default function Profile({onSignOut, onUpdateUser, account, loggedIn, onAuthorization, userData, onNavigation, onActiveMenu}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isActive, setActive] = React.useState(false);
  const inputEditList = Array.from(document.querySelectorAll('.popup__input_profile-info'));
  const currentUserData = userData;
  const greeting = `Привет, ${currentUserData.name}!`;

  function handleValidateForm(form) {
    const validationPopupProfile = new FormValidator(listValidation, form);
    validationPopupProfile.enableValidation();
  }

  function handleEditProfile() {
    setActive(true);
    inputEditList.map(item => item.removeAttribute('disabled'));
  }

  React.useEffect(() => {
    setName(currentUserData.name);
    setEmail(currentUserData.email);
  }, [currentUserData]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      email: email,
    });
  }

  return (
    <>
      <Header id="4" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <PopupWithForm id="1" name="profile-info" title={greeting}
                       onSubmit={handleSubmit}
                       buttonText={"Сохранить"}
                       onValidateForm={handleValidateForm}
                       isActive={isActive}
                       >
        <>
          <div className="popup__field popup__field_profile-info">
            <p className="popup__input-text popup__input-text_profile">Имя</p>
            <div className="popup__data-input">
              <input id="profile-name-input" type="text" className="popup__input popup__input_profile-info" name="name" placeholder="Имя" value={name} onChange={handleChangeName} disabled required  />
              <span className="profile-name-input-error popup__input-error"></span>
            </div>
          </div>
          <div className="popup__field popup__field_profile-info popup__field_not-underlined">
            <p className="popup__input-text popup__input-text_profile">E-mail</p>
            <div className="popup__data-input">
              <input id="profile-email-input" type="email" className="popup__input popup__input_profile-info" name="email" placeholder="Email" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" value={email} onChange={handleChangeEmail} disabled required  />
              <span className="profile-email-input-error popup__input-error"></span>
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