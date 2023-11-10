import React from 'react';
import validator from 'validator';

export default function useFormValidator() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidNew, setValidNew] = React.useState(false);
  const [isCurrentName, setCurrentName] = React.useState('');
  const [isCurrentEmail, setCurrentEmail] = React.useState('');

  React.useEffect(() => {
    if(isValid === true && isValidNew === true) {
      console.log(isValid, isValidNew);
      setIsValid(true);
    } else {
      console.log(isValid, isValidNew);
      setIsValid(false);
    }
  }, [isValid, isValidNew]);

  const handleChange = (event, currentUser) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setCurrentName(currentUser.name);
    setCurrentEmail(currentUser.email);
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    checkFieldsForm(name, value);
  };

  function checkFieldsForm(name, value) {
    if(name === "email") {
      if(!validator.isEmail(value)) {
        setErrors({...errors, [name]: "Неверный формат email."})
        setValidNew(false)
        console.log(validator.isEmail(value));
        console.log(value);
      } else if(validator.isEmail(value)) {
        if(isCurrentEmail === value) {
          setErrors({...errors, [name]: "Введите email, отличающийся от изначального."})
          setValidNew(false);
        } else if(isCurrentEmail !== value) {
          setValidNew(true);
        }
      }
    }
    if(name === "name") {
      if(!new RegExp(/^[a-zA-Zа-яёА-ЯЁ-]+$/).test(value)) {
        setErrors({...errors, [name]: "Используйте только латиницу или кириллицу, дефис."});
        setValidNew(false);
      } else if(new RegExp(/^[a-zA-Zа-яёА-ЯЁ-]+$/).test(value)) {
        if(isCurrentName === value) {
          setErrors({...errors, [name]: "Введите имя, отличающееся от изначального."})
          setValidNew(false);
        } else if(isCurrentName !== value) {
          setValidNew(true);
        }
      }
    }
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setValidNew(newValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};