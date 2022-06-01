import styles from './index.module.css';
import { useState } from 'react';
import DataConfirmationModalWindow from './../../modal-windows/data-confirmation';
import { observer } from 'mobx-react-lite';
import workersStore from './../../store';
import $api from './../../http/index'

const SaveButton = observer(() => {
  const [confirmationWindow, setConfirmationWindow] = useState(false);

  function dataIsReady() {
    return !workersStore.landingExists && workersStore.link && workersStore.selectedWorkers.length > 0;
  }

  return (
    <>
      <div className={styles.align}>
        <input 
          onClick={() => dataIsReady() ? setConfirmationWindow(s => !s) : null} 
          className={dataIsReady() ? styles.button : styles.errSaveBtn} 
          type='button' 
          value='Создать сайт' 
        />
      </div>
      {confirmationWindow && <DataConfirmationModalWindow status={setConfirmationWindow}/>}
    </>
  );
});

export default SaveButton;
