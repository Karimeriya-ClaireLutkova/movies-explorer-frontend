import React from 'react';
import validator from 'validator';

export default function useFormValidator(errorsCurrent) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidNew, setValidNew] = React.useState(false);
  const [isCurrentName, setCurrentName] = React.useState('');
  const [isCurrentEmail, setCurrentEmail] = React.useState('');
  const [errorsListCurrent, setErrorsListCurrent] = React.useState(errorsCurrent);
  const [isValidCurrent, setIsValidCurrent] = React.useState(false);

  React.useEffect(() => {
    setErrorsListCurrent(errorsCurrent);
  }, [errorsCurrent]);

  React.useEffect(() => {
    if(errorsCurrent) {
      const checkFormErrors = (errorsListCurrent) => {
        if(errorsListCurrent.name !== '' && errorsListCurrent.name !== undefined) {
          setIsValid(false);
        } else if(errorsListCurrent.email !== '' && errorsListCurrent.email !== undefined) {
          setIsValid(false);
        } else if(errorsListCurrent.password !== '' && errorsListCurrent.password !== undefined) {
          setIsValid(false);
        } else if((errorsListCurrent.name === '' || errorsListCurrent.name !== undefined) && (errorsListCurrent.email === '' || errorsListCurrent.password === undefined) && (errorsListCurrent.password === '' || errorsListCurrent.password === undefined)) {
          setIsValid(true);
        } else {
          setIsValid(true);
        }
      }
      checkFormErrors(errorsListCurrent);
    }
    
  }, [errorsListCurrent, errors, errorsCurrent]);

  React.useEffect(() => {
    if(errorsCurrent) {
      checkFormValid(isValid, isValidNew);
    }
  }, [isValid, isValidNew, errorsCurrent]);

  function checkFormValid(isValid, isValidNew) {
    if(isValid === true && isValidNew === true) {
      setIsValidCurrent(true);
    } else {
      setIsValidCurrent(false);
    }
  }

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
    if(pathname === undefined) {
      checkFieldsForm(name, value);
    } else {
      setIsValid(true);
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
        setIsValidCurrent(false);
      } else if (value.length > 0) {
        const textScreachCurrent = localStorage.getItem("textScreach");
        const textScreachSavedCurrent = localStorage.getItem("textScreachSaved");
        const valueNew = value.toLowerCase();
        if(textScreachCurrent) {
          const textScreachNew = textScreachCurrent.toLowerCase();
          if(pathname === "/movies" && valueNew === textScreachNew) {
            setErrors({...errors, [name]: "Нужно ввести ключевое слово, отличающееся от изначального."});
            setIsValidCurrent(false);
          } else {
            setIsValidCurrent(true);
          }
        }
        if(textScreachSavedCurrent) {
          const textScreachSavedNew = textScreachSavedCurrent.toLowerCase();
          if(pathname === "/saved-movies") {
            if(valueNew === textScreachSavedNew) {
              setErrors({...errors, [name]: "Нужно ввести ключевое слово, отличающееся от изначального."});
              setIsValidCurrent(false);
            } else {
              setIsValidCurrent(true);
            }
          }
        }
      }
    }
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newValid = false, newIsValidCurrent = false, newErrorsListCurrent = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setValidNew(newValid);
      setIsValidCurrent(newIsValidCurrent);
      setErrorsListCurrent(newErrorsListCurrent);
    },
    [setValues, setErrors, setIsValid, setValidNew, setIsValidCurrent, setErrorsListCurrent]
  );

  return { values, handleChange, errors, isValidCurrent, resetForm };
};