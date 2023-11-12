export const SCREEN_MIN = 768;
export const SCREEN_MEDIUM = 1023;
export const SCREEN_BIG = 1280;

export const conflictError = "Пользователь с таким email уже существует.";
export const forbiddenError = "Нет прав на удаление фильма.";
export const notFoundError = "Запрашиваемый пользователь не найден.";
export const validationError = "Переданы некорректные данные при обновлении профиля.";
export const unauthorizedError = "Неправильные почта или пароль";
export const serverError = 'На сервере произошла ошибка.';


export const listValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active',
  errorClassProfile: 'popup__input-error_active_profile',
  fieldClass: 'popup__field_error',
  fieldSelector: '.popup__field',
  errorSelector: '.popup__input-error'
});

export const urlBeginning = ' https://api.nomoreparties.co';