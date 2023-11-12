import React from 'react';
import {conflictError, forbiddenError, notFoundError, validationError, unauthorizedError, serverError } from '../utils/constants';

export default function useFormValidator() {
  const [messageError, setMessageError] = React.useState('');

  const handleErrorsStatus = (item) => {
    const error = item;
    const numberError = parseInt((error.split(':').pop()), 10);
    if (numberError === 400) {
      setMessageError(validationError);
    } else if (numberError === 401) {
      setMessageError(unauthorizedError);
    } else if (numberError === 403) {
      setMessageError(forbiddenError);
    } else if (numberError === 404) {
      setMessageError(notFoundError);
    } else if (numberError === 409) {
      setMessageError(conflictError);
    } else if (numberError === 500) {
      setMessageError(serverError);
    }
  }

  const resetError = React.useCallback(
    (newMessage = '') => {
      setMessageError(newMessage);
    }, [setMessageError]
  );

  return { messageError, handleErrorsStatus, resetError };
};
