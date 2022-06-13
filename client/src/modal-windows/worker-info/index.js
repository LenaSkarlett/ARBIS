import styles from './index.module.css';
import { IoClose } from 'react-icons/io5';
import stringService from './../../services/string-service';
import EditWorkerModalWindow from './../edit-worker';
import { AiFillEdit } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';

const WorkerInfoModalWindow = ({ worker, status }) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
  }, [status]);

  function closeModalWindow() {
    document.getElementsByTagName('body')[0].setAttribute('style', '');
    status(s => !s);
  }

  return (
    <>
      {isEdit ? 
        <EditWorkerModalWindow worker={worker} status={status} />
      :
        <div className={styles.background}>
          <div className={styles.window}>
            <AiFillEdit className={styles.editBtn} onClick={() => setIsEdit(true)} />
            <IoClose className={styles.closeBtn} onClick={closeModalWindow} />
            <div className={styles.form}>

              <div className={styles.about}>
                <div className={styles.photo} style={{backgroundImage: `url(${worker.photo})`}}>
                </div>

                <div className={styles.nameAndSpecialty}>
                  <h1>{worker.fullname}</h1>
                  <ul className={styles.specialty}>
                    {stringService.specialtyToArray(worker.specialty).map((speciality, index) => {
                      if (!speciality) return null;
                      return <li style={{marginTop: '3px'}} key={index}>{speciality}</li>;
                    })}
                  </ul>
                </div>
              </div>

              <div>
                <h1>Опыт проектов</h1>
                <ul>
                  {stringService.stringToArray(worker.experience).map((exp, index) => {
                    if (!exp) return null;
                    return <li style={{marginTop: '3px'}} key={index}>{exp}</li>;
                  })}
                </ul>
              </div>

              <div>
                <h1>Квалификация (сертификаты)</h1>
                <ul>
                  {stringService.stringToArray(worker.certificates).map((certificate, index) => {
                    if (!certificate) return null;
                    return <li style={{marginTop: '3px'}} key={index}>{certificate}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default WorkerInfoModalWindow;
