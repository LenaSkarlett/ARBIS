import React from 'react';
import AuthorizationForm from './../components/authorization-form';

const Auth = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <AuthorizationForm />
    </div>
  );
}

export default Auth;
