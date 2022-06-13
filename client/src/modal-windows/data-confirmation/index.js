import styles from './index.module.css';
import { IoClose } from 'react-icons/io5';
import $api from './../../http/index';
import workersStore from './../../store';
import Worker from './../../components/worker';
import React, { useEffect, useState } from 'react';
import Slider from './../../components/slider';

const DataConfirmationModalWindow = ({ status }) => {
  const [description, setDescription] = useState('Мы движемся вперед, чтобы освободить Вас от рутины.\nЧтобы Вы могли наслаждаться жизнью.');
  useEffect(() => {
    setDescription(defaultDescription => workersStore.description ? workersStore.description : defaultDescription)
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
  }, [status]);

  function saveToDatabase() {
    $api.post(`/landing/${workersStore.link}`, {
      workers: workersStore.selectedWorkers,
      description: description
    })
      .then(response => {
        window.open(`${process.env.REACT_APP_BASE_URL}/${workersStore.link}`, '_blank');
        window.location.reload();
      })
      .catch(error => console.log(error));
  }

  function closeModalWindow() {
    document.getElementsByTagName('body')[0].setAttribute('style', '');
    status(s => !s);
  }

  return (
    <div className={styles.background}>
      <div className={styles.window}>
        <IoClose className={styles.closeBtn} onClick={closeModalWindow} />
        <div className={styles.data}>
          <h1 className={styles.mainHeader}>Проверьте, всё верно?</h1>
          <Slider
            slides={
              workersStore.selectedWorkers.map((worker) => 
                <Worker
                  worker={worker} 
                />
              )
            }
            slidesOnPage={5}
            center={true}
            breakpoints={[
              {
                minWidth: 1230,
                slidesOnPage: 5
              },
              {
                minWidth: 1000,
                maxWidth: 1229,
                slidesOnPage: 4
              },
              {
                minWidth: 749,
                maxWidth: 999,
                slidesOnPage: 3
              },
              {
                maxWidth: 749,
                slidesOnPage: 2
              }
            ]}
          />

          <pre className={styles.description}>{description}</pre>
          <address 
            className={styles.link}
          >
            {process.env.REACT_APP_BASE_URL}/{workersStore.link}
          </address>
          

          <div className={styles.buttons}>
            <input className={`${styles.button} ${styles.cancel}`} onClick={closeModalWindow} type="button" value="Отмена" />
            <input className={`${styles.button} ${styles.continue}`} type="button" value="Продолжить" onClick={saveToDatabase} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataConfirmationModalWindow;
