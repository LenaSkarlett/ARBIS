import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import $api from './../../http';

const Validation = {
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

function Authorization() {
  const navigate = useNavigate();
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: true,
  }); 

  const [loginColor, setLoginColor] = useState(Validation.error);
  const [passwordColor, setPasswordColor] = useState(Validation.error);

  function setValidationLoginColor(event) {
    if (event.target.value.length < 4) {
      setLoginColor(Validation.error);
    }
    else {
      setLoginColor('#49C68A');
    }
  }

  function setValidationPasswordColor(event) {
    if (event.target.value.length < 8) {
      setPasswordColor(Validation.error);
    }
    else {
      setPasswordColor(Validation.correct);
    }
  }

  function signin(fields) {
    $api.post('/auth', {
      login: fields.login,
      password: fields.password
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  }

  function logining() {
    if (loginColor === Validation.correct && passwordColor === Validation.correct) {
      return <input className={styles.signIn} type="submit" value="Войти"/>
    }
    return <></>
  }

  return (
    <>
      <form className={styles.mainBlock} onSubmit={handleSubmit(signin)}>
        <h1 className={styles.authHeader}>Авторизуйтесь</h1>
        <label className={styles.header}>Логин
          <div className={styles.fieldBlock}>
            <input 
              type="text"
              className={styles.field}
              {...register('login', loginErrors)}
              autoComplete='off' 
              spellCheck='false'
              onChange={event => setValidationLoginColor(event)}
            />
            <BsCircleFill 
              className={styles.circle} 
              style={{
                width: '15px',
                height: '15px',
                fill: loginColor,
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
              {...register('password', passwordErrors)}
              autoComplete='off' 
              spellCheck='false'
              onChange={event => setValidationPasswordColor(event)}
            />
            <BsCircleFill 
              className={styles.circle} 
              style={{
                width: '15px',
                height: '15px',
                fill: passwordColor,
              }} 
            />
          </div>
        </label>
        
        {errors &&
          <span className={styles.error}>
            {errors[Object.keys(errors)[0]]?.message} 
          </span>
        }
        <span className={styles.error}>
          {logining()}
        </span>
      </form>
    </>
  );
}

export default Authorization;