import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import $api from './../../http';

const colors = {
  correct: '#49C68A',
  error: '#C64949',
  default: '#ffffff00'
}

const loginErrors = {
  required: {
    value: true, 
    message: 'Логин является обязательным полем для заполнения.'
  },
  minLength: {
    value: 4, message: 'Логин должен быть не менее 4 символов.'
  },
  maxLength: {
    value: 20, message: 'Логин не должен содержать в себе более 20 символов.'
  }
};

const passwordErrors = {
  required: {
    value: true, 
    message: 'Пароль является обязательным полем для заполнения.'
  },
  minLength: {
    value: 8, message: 'Пароль должен быть не менее 8 символов.'
  },
  maxLength: {
    value: 64, message: 'Пароль не должен содержать в себе более 64 символов.'
  }
};

function AuthorizationForm() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    value: '',
    color: colors.default,
    error: null
  });
  const [password, setPassword] = useState({
    value: '',
    color: colors.default,
    error: null
  });

  function validateLogin(event) {
    if (!event.target.value && loginErrors.required.value) {
      setLogin((prev) => ({ ...prev, color: colors.error, error: loginErrors.required.message }));
    }
    else if (event.target.value.length < loginErrors.minLength.value) {
      setLogin((prev) => ({ ...prev, color: colors.error, error: loginErrors.minLength.message }));
    }
    else if (event.target.value.length > loginErrors.maxLength.value) {
      setLogin((prev) => ({ ...prev, color: colors.error, error: loginErrors.maxLength.message }));
    } 
    else {
      setLogin((prev) => ({ ...prev, color: colors.correct, error: null }));
    }
    setLogin((prev) => ({ ...prev, value: event.target.value }));
  }

  function validatePassword(event) {
    if (!event.target.value && passwordErrors.required.value) {
      setPassword((prev) => ({ ...prev, color: colors.error, error: passwordErrors.required.message }));
    }
    else if (event.target.value.length < passwordErrors.minLength.value) {
      setPassword((prev) => ({ ...prev, color: colors.error, error: passwordErrors.minLength.message }));
    }
    else if (event.target.value.length > passwordErrors.maxLength.value) {
      setPassword((prev) => ({ ...prev, color: colors.error, error: passwordErrors.maxLength.message }));
    } 
    else {
      setPassword((prev) => ({ ...prev, color: colors.correct, error: null }));
    }
    setPassword((prev) => ({ ...prev, value: event.target.value }));
  }

  function signin(event) {
    event.preventDefault();

    $api.post('/auth', {
      login: login.value,
      password: password.value
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  }

  const isCorrectFields = () => login.color === colors.correct && password.color === colors.correct;

  return (
    <>
      <form className={styles.mainBlock} onSubmit={signin}>
        <h1 className={styles.authHeader}>
          Авторизуйтесь
        </h1>
        <label className={styles.header}>
          Логин
          <div className={styles.fieldBlock}>
            <input 
              type="text"
              className={styles.field}
              value={login.value}
              autoComplete='off' 
              spellCheck='false'
              onChange={validateLogin}
            />
            <BsCircleFill 
              className={styles.circle} 
              style={{
                width: '15px',
                height: '15px',
                fill: login.color,
              }} 
            />
          </div>
        </label>
        
        <label className={styles.header}>
          Пароль
          <div className={styles.fieldBlock}>
            <input 
              type="password"
              className={styles.field}
              value={password.value}
              autoComplete='off' 
              spellCheck='false'
              onChange={validatePassword}
            />
            <BsCircleFill 
              className={styles.circle} 
              style={{
                width: '15px',
                height: '15px',
                fill: password.color,
              }} 
            />
          </div>
        </label>
        
        {login.error ?
          <span className={styles.error}>
            {login.error} 
          </span>
        : password.error ? 
          <span className={styles.error}>
            {password.error} 
          </span>
        :
          <span className={styles.error}>
            {isCorrectFields() && 
              <input className={styles.signIn} type="submit" value="Войти"/>
            }
          </span>
        }
      </form>
    </>
  );
}

export default AuthorizationForm;
