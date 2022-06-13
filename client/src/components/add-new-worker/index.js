import styles from './index.module.css';
import { HiPlus } from 'react-icons/hi';
import React, { useState } from 'react';
import AddNewWorkerModalWindow from './../../modal-windows/add-new-worker';
import workersStore from './../../store';

const AddNewWorker = () => {
  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

  return (
    <>
      <div 
        className={workersStore.displayMode === 'columns' ? styles.column : styles.line} 
        onClick={() => setModalWindowIsOpen(currentStatus => !currentStatus)}
      >
        <HiPlus className={styles.plusIcon} />
      </div>
      {modalWindowIsOpen && <AddNewWorkerModalWindow status={setModalWindowIsOpen} />}
    </>
  );
}

export default AddNewWorker;
