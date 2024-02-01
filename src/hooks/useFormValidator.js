import React from 'react';
import validator from 'validator';

export default function useFormValidator(errorsCurrent) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidNew, setValidNew] = React.useState(false);
  const [isValidForm, setValidForm] = React.useState(false);
  const [isCurrentName, setCurrentName] = React.useState('');
  const [isCurrentEmail, setCurrentEmail] = React.useState('');
  const [errorsListCurrent, setErrorsListCurrent] = React.useState(errorsCurrent);

  React.useEffect(() => {
    setErrorsListCurrent(errorsCurrent);
  }, [errorsCurrent]);

  React.useEffect(() => {
    console.log(isValid, isValidNew, isValidForm);
    if(isValid === true && isValidNew === true && isValidForm === true) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValid, isValidNew, isValidForm]);

  const handleChange = (event, currentUser, pathname) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if(currentUser !== undefined) {
      setCurrentName(currentUser.name);
      setCurrentEmail(currentUser.email);
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    if(pathname === undefined) {
      checkFieldsForm(name, value);
    } else {
      checkFieldsForm(name, value, pathname);
    }
  };

  function checkFieldsForm(name, value, pathname) {
    if (name === "email") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле email не может быть пустым."});
        setValidNew(false);
      } else if (value.length > 0) {
        if (!validator.isEmail(value)) {
          setErrors({...errors, [name]: "Неверный формат Email."});
          setValidNew(false);
        } else if (validator.isEmail(value)) {
          if (isCurrentEmail === value) {
            setErrors({...errors, [name]: "Введите email, отличающийся от изначального."});
            setValidNew(false);
          } else if (isCurrentEmail !== value) {
            setValidNew(true);
          }
        }
      }
    }
    if (name === "name") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле Имя не может быть пустым."});
        setValidNew(false);
      } else if (value.length === 1) {
        setErrors({...errors, [name]: "Поле Имя не может содержать менее 2 символов."});
        setValidNew(false);
      } else if(value.length >= 2) {
        if (!new RegExp(/^[a-zA-Zа-яёА-ЯЁ]+(?:[\s-][a-zA-Zа-яёА-ЯЁ]+)*$/).test(value)) {
          setErrors({...errors, [name]: "Используйте только латиницу или кириллицу, дефис и один пробел."});
          setValidNew(false);
        } else if (new RegExp(/^[a-zA-Zа-яёА-ЯЁ]+(?:[\s-][a-zA-Zа-яёА-ЯЁ]+)*$/).test(value)) {
          if (isCurrentName === value) {
            setErrors({...errors, [name]: "Введите имя, отличающееся от изначального."});
            setValidNew(false);
          } else if(isCurrentName !== value) {
            setValidNew(true);
          }
        }
      } 
    }
    if (name === "password") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле Пароль не может быть пустым."});
        setValidNew(false);
      } else {
        setValidNew(true);
      }
    }
    if(name === "film") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Нужно ввести ключевое слово."});
        setValidNew(false);
      } else if (value.length > 0) {
        const textScreachCurrent = localStorage.getItem("textScreach");
        const textScreachSavedCurrent = localStorage.getItem("textScreachSaved");
        if(pathname === "/movies" && value === textScreachCurrent) {
          setErrors({...errors, [name]: "Нужно ввести ключевое слово, отличающееся от изначального."});
          setValidNew(false);
        } else if(pathname === "/saved-movies") {
          if(value === textScreachSavedCurrent) {
            setErrors({...errors, [name]: "Нужно ввести ключевое слово, отличающееся от изначального."});
            setValidNew(false);
          } else {
            setValidNew(true);
          }
        } else {
          setValidNew(true);
        }
      }
    }
    checkFormErrors(errorsListCurrent);
  }

  function checkFormErrors(errorsListCurrent) {
    console.log(errorsListCurrent, errors);
    if(errorsListCurrent !== '') {
      setValidForm(false);
    } else if(errorsListCurrent.email !== '') {
      setValidForm(false);
    } else if(errorsListCurrent.password !== '') {
      setValidForm(false);
    } else if(errorsListCurrent.name === '' && errorsListCurrent.email === '' && (errorsListCurrent.password === '' || errorsListCurrent.password === undefined)) {
      setValidForm(true);
    } /*else if(errors.name === '' && errors.email === '' && (errors.password === '' || errors.password === undefined)) {
      setIsValid(true);
    }*/
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newValid = false, newValidForm = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setValidNew(newValid);
      setValidForm(newValidForm);
    },
    [setValues, setErrors, setIsValid, setValidForm]
  );

  return { values, handleChange, errors, isValid, checkFormErrors, resetForm };
};