import React from 'react';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator';
import './Profile.css';

export default function Profile({onSignOut, onUpdateUser, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const [nameFirst, setNameFirst] = React.useState('');
  const [emailFirst, setEmailFirst] = React.useState('');
  const [isActive, setActive] = React.useState(false);
  const { values, errors, isValid, handleChange, resetForm  } = useFormValidator();
  const inputEditList = Array.from(document.querySelectorAll('.popup__input_profile-info'));
  const buttonSave = document.querySelector('.popup__button_show_profile-info');
  const currentUser = React.useContext(CurrentUserContext);
  let greeting = `Привет, ${nameFirst}!`;

  function handleEditProfile() {
    setActive(true);
    inputEditList.map(item => item.removeAttribute('disabled'));
  }

  React.useEffect(() => {
    const { name, email } = values;
    const deactivateButton = () => {
      if (name.values === nameFirst && email.values === emailFirst) {
        buttonSave.classList.add('.popup__button_inactive');
      } else {
        buttonSave.classList.remove('.popup__button_inactive');
      }
    };
    deactivateButton();    
  }, [emailFirst, nameFirst, values, buttonSave.classList]);

  React.useEffect(() => {
    if (loggedIn) {
      setNameFirst(currentUser.name);
      setEmailFirst(currentUser.email);
    }    
  }, [currentUser, loggedIn]);

  function handleSubmit(evt) {
    evt.preventDefault();

    const { name, email } = values;
    onUpdateUser({
      name: name,
      email: email,
    });
    resetForm();
  }

  return (
    <>
      <Header id="4" loggedIn={loggedIn} onAuthorization={onAuthorization} onNavigation={onNavigation} onActiveMenu={onActiveMenu} />
      <main>
        <PopupWithForm id="1" name="profile-info" title={greeting}
                       onSubmit={handleSubmit}
                       buttonText={"Сохранить"}
                       isActive={isActive}
                       >
        <>
          <div className="popup__field popup__field_profile-info">
            <p className="popup__input-text popup__input-text_profile">Имя</p>
            <div className="popup__data-input">
              <input id="profile-name-input" type="text" className="popup__input popup__input_profile-info" name="name" placeholder="Имя" value={nameFirst} onChange={handleChange} disabled required  />
              <span className="profile-name-input-error popup__input-error"></span>
            </div>
          </div>
          <div className="popup__field popup__field_profile-info popup__field_not-underlined">
            <p className="popup__input-text popup__input-text_profile">E-mail</p>
            <div className="popup__data-input">
              <input id="profile-email-input" type="email" className="popup__input popup__input_profile-info" name="email" placeholder="Email" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" value={emailFirst} onChange={handleChange} disabled required  />
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