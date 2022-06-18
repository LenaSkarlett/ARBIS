import styles from './index.module.css';
import React, { useEffect } from 'react';
import Worker from './../worker';
import $api from './../../http';
import DisplayModeSwitch from './../display-mode-switch';
import AddNewWorker from './../add-new-worker';
import { observer } from 'mobx-react-lite';
import workersStore from './../../store';
import Slider from './../slider';

const Workers = observer(() => {
  useEffect(() => {
    getWorkers();
  }, []);

  function getWorkers() {
    $api.get('/workers')
      .then(response => workersStore.setWorkers(response.data.sort((prev, next) => {
        if ( prev.fullname < next.fullname ) return -1;
        if ( prev.fullname < next.fullname ) return 1;
      })))
      .catch(error => console.log(error));
  }

  function changeActive(worker) {
    if (isSelected(worker)) {
      workersStore.del(worker.id);
    }
    else {
      const result = workersStore.add(worker);
      if (!result) {
        alert('Нельзя выбрать более пяти работников!');
      }
    }
  }

  function isSelected(worker) {
    return workersStore.selectedWorkers.filter(selectedWorker => selectedWorker.id === worker.id).length > 0;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1>1. Выберите членов команды</h1>
        <DisplayModeSwitch />
      </div>
      <Slider 
        direction={workersStore.displayMode}
        slides={[
          ...workersStore.workers.map((worker, index) =>
            <Worker 
              key={index} 
              index={index+1}
              worker={worker} 
              clickAction={() => changeActive(worker)} 
              isSelected={() => isSelected(worker)}
              showFunctionMenu={true}
              mode={workersStore.displayMode}
            />
          ),
          <AddNewWorker />
        ]}
        breakpoints={[
          {
            minWidth: 1230,
            slidesOnPage: 15
          },
          {
            minWidth: 1000,
            maxWidth: 1229,
            slidesOnPage: 12
          },
          {
            minWidth: 750,
            maxWidth: 999,
            slidesOnPage: 9
          },
          workersStore.displayMode === 'columns' ? {
            maxWidth: 749,
            slidesOnPage: 4
          } : {
            maxWidth: 749,
            slidesOnPage: 8
          }
        ]}
        reverse={false}
      />
    </section>
  );
});

export default Workers;
