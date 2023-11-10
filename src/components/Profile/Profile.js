import React from 'react';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator';
import './Profile.css';

export default function Profile({onSignOut, onUpdateUser, loggedIn, onAuthorization, onNavigation, onActiveMenu}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isActive, setActive] = React.useState(false);
  const [isName, setName] = React.useState('');
  const [isEmail, setEmail] = React.useState('');
  const { errors, isValid, handleChange, resetForm  } = useFormValidator();
  console.log(errors);
  let greeting = `Привет, ${currentUser.name}!`;

  function handleEditProfile() {
    const inputEditList = Array.from(document.querySelectorAll('.popup__input_profile-info'));
    inputEditList.map(item => item.removeAttribute('disabled'));
    setActive(true);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeInput(evt) {
    handleChange(evt, currentUser);    
    if(evt.target.name === 'name') {
      setName(evt.target.value);
    } else if(evt.target.name === 'email') {
      setEmail(evt.target.value);
    }
  }  

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: isName,
      email: isEmail,
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
                       isValid={isValid}
                       >
        <>
          <div className={`popup__field popup__field_profile-info ${!isValid ? "popup__field_error" : ""}`}>
            <p className="popup__input-text popup__input-text_profile">Имя</p>
            <div className="popup__data-input">
              <input id="profile-name-input" type="text" className="popup__input popup__input_profile-info" name="name" placeholder="Имя" value={isName} onChange={handleChangeInput} autoComplete="off" disabled required  />
              <span className="profile-name-input-error popup__input-error"></span>
            </div>
          </div>
          <div className="popup__field popup__field_profile-info popup__field_not-underlined">
            <p className="popup__input-text popup__input-text_profile">E-mail</p>
            <div className="popup__data-input">
              <input id="profile-email-input" type="email" className="popup__input popup__input_profile-info" name="email" pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" placeholder="Email" value={isEmail} onChange={handleChangeInput} autoComplete="off" disabled required  />
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