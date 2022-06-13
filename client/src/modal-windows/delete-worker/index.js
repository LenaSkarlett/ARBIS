import styles from './index.module.css';
import { IoClose } from 'react-icons/io5';
import $api from './../../http/index';
import workersStore from './../../store';
import Worker from './../../components/worker';
import React, { useEffect } from 'react';

const DeleteWorkerModalWindow = ({ worker, status }) => {
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
  });

  function deleteWorker(event) {
    $api.delete(`/workers/${worker.id}`)
      .then(response => workersStore.delWorker(worker.id))
      .catch(error => console.log(error));
    closeModalWindow();
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
          <h1 className={styles.mainHeader}>Вы точно хотите удалить?</h1>
          <Worker worker={worker} showFunctionMenu={false} />
          <div className={styles.buttons}>
            <input className={`${styles.button} ${styles.cancel}`} onClick={closeModalWindow} type="button" value="Отмена" />
            <input className={`${styles.button} ${styles.continue}`} type="button" value="Да" onClick={deleteWorker} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteWorkerModalWindow;
