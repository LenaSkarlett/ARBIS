import styles from './index.module.css';
import workersStore from './../../store';
import $api from './../../http';
import { useState } from 'react';
import DataConfirmationModalWindow from './../../modal-windows/data-confirmation';

const SetLinkName = () => {
  const [landingExists, setLandingExists] = useState(workersStore.landingExists);
  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

  function landingPageExists(event) {
    workersStore.setLink(event.target.value)

    $api.get(`/landing/${workersStore.link}`)
      .then(response => {
        if (response.status === 200) {
          setLandingExists(true);
        }
        else {
          setLandingExists(false);
        }
      })
      .catch(error => setLandingExists(false));
  }

  return (
    <>
      {modalWindowIsOpen && 
        <DataConfirmationModalWindow status={setModalWindowIsOpen} />
      }
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>3. Введите название ссылки</h1>
        </div>
        <span className={styles.hostName}>https://localhost:3000/</span>
        <input 
          type="text" 
          className={landingExists ? styles.linkNameExists : styles.linkName} 
          spellCheck={false} 
          onChange={landingPageExists} 
        />
        <br />
        {landingExists && 
          <span className={styles.warningMessage}>
            * Ссылка уже существует. <button 
              className={styles.applyChanges}
              onClick={() => setModalWindowIsOpen(s => !s)}
            > Применить изменения</button>
          </span>
        }
      </section>
    </>
  );
}

export default SetLinkName;
