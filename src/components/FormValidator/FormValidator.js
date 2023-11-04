export default class FormValidator {
  constructor(listValidation, formElement) {
    this._formElement = formElement;
    this._formSelector = listValidation.formSelector;
    this._inputSelector = listValidation.inputSelector;
    this._submitButtonSelector = listValidation.submitButtonSelector;
    this._inactiveButtonClass = listValidation.inactiveButtonClass;
    this._inactiveButtonClassProfile = listValidation.inactiveButtonClassProfile;
    this._inputErrorClass = listValidation.inputErrorClass;
    this._errorClass = listValidation.errorClass;
    this._errorClassProfile = listValidation.errorClassProfile;
    this._fieldClass = listValidation.fieldClass;
    this._fieldSelector = listValidation.fieldSelector;
    this._errorSelector = listValidation.errorSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    })
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    const fieldElement = inputElement.parentElement;
    errorElement.textContent = errorMessage;
    this._increaseFormView(fieldElement);
    if (fieldElement.classList.contains('profile-info__container')) {
      errorElement.classList.add(this._errorClassProfile)
    } else {
      errorElement.classList.add(this._errorClass)
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    const fieldElement = inputElement.parentElement;
    if (fieldElement.classList.contains('profile-info__container')) {
      errorElement.classList.remove(this._errorClassProfile)
    } else {
      errorElement.classList.remove(this._errorClass)
    }
    errorElement.textContent = '';
    this._restoreSizeForm(fieldElement)
  }

  _increaseFormView (fieldElement) {
    fieldElement.classList.add(this._fieldClass);
  }

  _restoreSizeForm (fieldElement) {
    fieldElement.classList.remove(this._fieldClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      if(this._buttonElement.classList.contains('popup__button_profile-info')) {
        this._buttonElement.classList.add(this._inactiveButtonClassProfile);
      } else {
        this._buttonElement.classList.add(this._inactiveButtonClass);
      }      
    } else {
      this._buttonElement.removeAttribute('disabled');
      if(this._buttonElement.classList.contains('popup__button_profile-info')) {
        this._buttonElement.classList.remove(this._inactiveButtonClassProfile);
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
      }      
    }
  }

  clearErrorFull() {
    this._fieldsetList.forEach((fieldSet) => {
      const inputElement = fieldSet.querySelector(this._inputSelector);
      this._hideInputError(inputElement);
    });
  }

  checkButtonSubmit() {
    this._toggleButtonState();
  }
}