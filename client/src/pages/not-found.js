import React from 'react';

const NotFound = () => {
  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1 style={{
        fontFamily: 'Roboto',
        fontSize: 'calc(3vw + 3vh + .5vmin)',
        whiteSpace: 'nowrap',
        color: '#333',
      }}>
        <mark style={{color: '#DD6165', background: '#ffffff00' }}>404:</mark> СТРАНИЦА НЕ НАЙДЕНА :(
      </h1>
    </div>
  );
}

export default NotFound;
