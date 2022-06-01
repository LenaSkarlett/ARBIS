import styles from './index.module.css';
import { IoClose } from 'react-icons/io5';
import $api from './../../http/index';
import workersStore from './../../store';
import Worker from './../../components/worker';
import SliderDataConfirmation from './../../components/slider-data-confirmation';
import { useEffect } from 'react';

const DataConfirmationModalWindow = ({ status }) => {
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
  }, [status]);

  function saveToDatabase() {
    $api.post(`/landing/${workersStore.link}`, {
      workers: workersStore.selectedWorkers,
      description: workersStore.description
    })
      .then(response => {
        window.open(`http://localhost:3000/${workersStore.link}`, '_blank');
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
          <SliderDataConfirmation 
            slides={
              workersStore.selectedWorkers.map((worker) => 
                <Worker
                  worker={worker} 
                  clickAction={() => null} 
                  isSelected={() => null}
                />
              )
            }
            slidesOnPage={5}
            center={true}
          />

          <address 
            style={{marginBottom: !workersStore.description ? '58px' : '10px'}} 
            className={styles.link}
          >
            https://localhost:3000/{workersStore.link}
          </address>
          <span className={styles.description}>{workersStore.description}</span>

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
