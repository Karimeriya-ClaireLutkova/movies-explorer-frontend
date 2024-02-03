import React from 'react';
import validator from 'validator';

export default function useFormValidator() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidNew, setValidNew] = React.useState(false);
  const [isCurrentName, setCurrentName] = React.useState('');
  const [isCurrentEmail, setCurrentEmail] = React.useState('');
  const [isValidCurrent, setIsValidCurrent] = React.useState(false);
  const [pathnameCurrent, setPathCurrent] = React.useState('');

  React.useEffect(() => {
    if(pathnameCurrent === '/sign-in' || pathnameCurrent === '/sign-up' || pathnameCurrent === '/profile' ) {
      const checkFormErrors = (errors) => {
        if(pathnameCurrent === '/sign-up') {
          if(errors.name !== '' && errors.name === undefined) {
            setIsValid(false);
          } else if(errors.email !== '' || errors.email === undefined) {
          } else if(errors.password !== '' || errors.password === undefined) {
            setIsValid(false);
          } else if((errors.name === '') && (errors.email === '') && (errors.password === '')) {
            setIsValid(true);
          }
        } else if(pathnameCurrent === '/sign-in') {
          if(errors.email !== '' || errors.email === undefined) {
            setIsValid(false);
          } else if(errors.password !== '' || errors.password === undefined) {
            setIsValid(false);
          } else if((errors.email === '') && (errors.password === '')) {
            setIsValid(true);
          }
        } else if(pathnameCurrent === '/profile') {
          if(errors.name !== '' && errors.name !== undefined) {
            setIsValid(false);
            console.log('1', errors);
          } else if(errors.email !== '' && errors.email !== undefined) {
            setIsValid(false);
            console.log('2', errors);
          } else if(((errors.name === '') && (errors.email === '')) || ((errors.name === undefined) && (errors.email === '')) || ((errors.email === undefined) && (errors.name === ''))) {
            setIsValid(true);
            console.log('3', errors);
          } else if((errors.name === undefined) && (errors.email === undefined)) {
            setIsValid(false);
            console.log('4', errors);
          }
        }
      }
      checkFormErrors(errors);
    }
  }, [errors, pathnameCurrent]);

  React.useEffect(() => {
    if(pathnameCurrent === '/sign-in' || pathnameCurrent === '/sign-up' || pathnameCurrent === '/profile') {
      const checkFormValid = (isValid, isValidNew) => {
        if(isValid === true && isValidNew === true) {
          setIsValidCurrent(true);
        } else {
          setIsValidCurrent(false);
        }
      };
      checkFormValid(isValid, isValidNew);
    }
  }, [isValid, isValidNew, pathnameCurrent]);

  const handleChange = (data) => {
    setIsValid(false);
    const target = data.event.target;
    const name = target.name;
    const value = target.value;
    if(data.currentUser !== undefined) {
      setCurrentName(data.currentUser.name);
      setCurrentEmail(data.currentUser.email);
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    if(data.pathname === undefined) {
      checkFieldsForm(name, value);
      setIsValid(true);
    } else {
      setPathCurrent(data.pathname);
      checkFieldsForm(name, value, data.pathname);
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
        if(textScreachCurrent || textScreachSavedCurrent) {
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
        } else {
          setIsValidCurrent(true);
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
    },
    [setValues, setErrors, setIsValid, setValidNew, setIsValidCurrent]
  );

  return { values, handleChange, errors, isValidCurrent, resetForm };
};