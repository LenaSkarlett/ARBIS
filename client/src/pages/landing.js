import React from 'react';
import Header from './../components/header';
import IntroducingTeam from './../components/introducing-team';
import { useParams } from 'react-router-dom';
import React from 'react';

const Landing = () => {
  const { name } = useParams();

  return (
    <>
      <Header text='Добро пожаловать' mainInfo='в центр внедрения' />
      <IntroducingTeam pathName={name} />
    </>
  );
}

export default Landing;
