import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Header from '../Header/Header';

export default function Profile({isOpen, onSignOut, onUpdateUser, account, loggedIn, onAuthorization, userData}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [currentUserData, setCurrentUserData] = React.useState(userData);
  const greeting = `Привет, ${currentUserData.name}!`;

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUserData.name);
      setEmail(currentUserData.email);
    };
  }, [isOpen, currentUserData]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      _id: userData._id,
      name: name,
      email: email,
    });
  }

  return (
    <>
      <Header id="4" account={account} loggedIn={loggedIn} onAuthorization={onAuthorization} />
      <main>
        <PopupWithForm id="1" name="profile-info" title={greeting}
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       buttonText={"Редактировать"}>
          <div className="popup__field">
            <p className="popup__input-text">Имя</p>
            <input id="profile-name-input" type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" value={name} onChange={handleChangeName} required  />
            <span className="profile-name-input-error popup__input-error"></span>
          </div>
          <div className="popup__field">
            <p className="popup__input-text">E-mail</p>
            <input id="profile-email-input" type="email" className="popup__input popup__input_type_email" name="email" placeholder="Email" value={email} onChange={handleChangeEmail} required  />
            <span className="profile-email-input-error popup__input-error"></span>
          </div>
          <div className="popup__signOut">
            <button type="button" className="popup__button" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>
        </PopupWithForm>
      </main>
   </>
  )
}