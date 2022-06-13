import styles from './index.module.css';
import workersStore from './../../store';
import { observer } from 'mobx-react-lite';
import $api from './../../http';
import React, { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import DataConfirmationModalWindow from '../../modal-windows/data-confirmation';
import LinksModalWindow from '../../modal-windows/links';

const SetLinkName = observer(() => {
  const [landingExists, setLandingExists] = useState(workersStore.landingExists);
  const [modalWindowConfirmation, setModalWindowConfirmation] = useState(false);
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

  useEffect(() => {
    workersStore.setLandingExists(landingExists);
  }, [landingExists])

  return (
    <>
      {modalWindowIsOpen && 
        <LinksModalWindow status={setModalWindowIsOpen} />
      }
      {modalWindowConfirmation && 
        <DataConfirmationModalWindow status={setModalWindowConfirmation} />
      }
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>3. Введите название ссылки 
            <abbr title="Посмотреть список созданных портфолио">
              <FaInfoCircle onClick={() => setModalWindowIsOpen(s => !s)} className={styles.infoIcon} />
            </abbr>
          </h1>
        </div>
        <span className={styles.hostName}>{process.env.REACT_APP_BASE_URL}/</span>
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
              onClick={() => {
                if (workersStore.selectedWorkers.length > 0) {
                  setModalWindowConfirmation(s => !s);
                }
                else {
                  alert('Сначала выберите работников!');
                }
              }}
            > Применить изменения</button>
          </span>
        }
      </section>
    </>
  );
});

export default SetLinkName;
