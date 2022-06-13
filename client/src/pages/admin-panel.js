import Header from './../components/header';
import Workers from './../components/workers';
import SetLinkName from './../components/set-link-name';
import SetDescriptionTeam from './../components/set-description-team';
import SaveButton from './../components/save-button';
import React from 'react';

const AdminPanel = () => {
  return (
    <>
      <Header text='Здесь вы можете создать' mainInfo='сайт-портфолио' />
      <Workers />
      <SetDescriptionTeam />
      <SetLinkName />
      <SaveButton />
    </>
  );
}

export default AdminPanel;
