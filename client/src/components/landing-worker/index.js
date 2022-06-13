import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import stringService from './../../services/string-service';
import React from 'react';

const LandingWorker = observer(({ worker, selectedWorker, setSelectedWorker }) => {
  
  function isSelected() {
    return worker.id === selectedWorker.id;
  }

  function selectWorker() {
    if (!isSelected()) {
      setSelectedWorker(worker);
    }
  }

  return (
    <>
      <div className={`${styles.workerBlock} ${isSelected() ? styles.isSelected : undefined}`} onClick={selectWorker} >
        <div className={styles.photo} style={{backgroundImage: `url(${worker.photo})`}}></div>
        <div className={styles.text}>
          <h3 className={styles.fullName}>
            {worker.fullname}
          </h3>
          <ul className={styles.specialty}>
            {worker.specialty?.slice(0, 4).map((spec, index) => 
              <li key={index}>{stringService.getLimitedString(spec, 15)}</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
});

export default LandingWorker;
