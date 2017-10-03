import Promise from 'es6-promise';

const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

function setLogingPending(isLoginPending) {
  return {
    type: LOGIN_PENDING,
    isLoginPending
  };
}

export function setLogingSuccess(isLoginSuccess) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLogingError(isLoginError) {
  return {
    type: LOGIN_ERROR,
    isLoginError
  };
}

function sendLoginRequest(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin') {
        return resolve(true);
      }
      return reject(new Error('Invalid email or password'));
    }, 1000);
  });
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLogingPending(true));
    dispatch(setLogingSuccess(false));
    dispatch(setLogingError(null));

    sendLoginRequest(email, password)
      .then(success => {
        if (success) {
          /**/
        }
        dispatch(setLogingPending(false));
        dispatch(setLogingSuccess(true));
      })
      .catch(err => {
        dispatch(setLogingPending(false));
        dispatch(setLogingError(err));
      });
  };
}
