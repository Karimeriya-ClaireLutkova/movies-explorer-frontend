import React from 'react';
import validator from 'validator';

export default function useFormValidator(item) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    checkFieldsForm(name, value);
  };

  function checkFieldsForm(name, value) {
    if(name === "email") {
      if(!validator.isEmail(value)) {
        setErrors({...errors, [name]: "Неверный формат email"})
        setIsValid(false)
      }
    } else if(name === "name") {
      if(!new RegExp(/^[a-zA-Zа-яёА-ЯЁ/-]+$/).test(value)) {
        setErrors({...errors, [name]: "Используйте только латиницу или кириллицу, дефис"})
        setIsValid(false)
      }
    }
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};