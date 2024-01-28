import React from 'react';

import { conflictError,
       forbiddenError,
       notFoundError,
       validationError,
       unauthorizedError,
       serverError,
       validationErrorRegister,
       unauthorizedErrorToken,
      } from '../utils/constants';

export default function useFormValidator() {
  const [messageError, setMessageError] = React.useState('');

  const handleErrorsStatus = (item, pathname) => {
    const error = item.split(' ').slice(-1);
    if (item !== '' || item !== undefined) {
      const numberError = parseInt(error);
      if (numberError === 400) {
        pathname === '/sign-up' && setMessageError(validationErrorRegister);
        pathname === '/sign-in' && setMessageError(unauthorizedError);
        pathname === '/profile' && setMessageError(validationError);
      } else if (numberError === 401) {
        pathname === '/sign-in' && setMessageError(unauthorizedError);
        pathname === '/' && setMessageError(unauthorizedErrorToken);     
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
  }

  const resetError = React.useCallback(
    (newMessage = '') => {
      setMessageError(newMessage);
    }, [setMessageError]
  );

  return { messageError, handleErrorsStatus, resetError };
};