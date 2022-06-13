import styles from './index.module.css';
import React, { useState } from 'react';
import { BsThreeDotsVertical, BsTriangleFill, BsCheck2 } from 'react-icons/bs';
import { observer } from 'mobx-react-lite';
import WorkerInfoModalWindow from './../../modal-windows/worker-info';
import EditWorkerModalWindow from './../../modal-windows/edit-worker';
import DeleteWorkerModalWindow from './../../modal-windows/delete-worker';
import stringService from './../../services/string-service';

const Worker = observer(({ 
  index, 
  worker, 
  clickAction = () => null, 
  isSelected = () => null, 
  showFunctionMenu = false,
  mode = 'columns'
}) => {
  const [functionsMenu, setFunctionMenu] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  function checkClickClassName(event) {
    const { className } = event.target;
    const classesForbiddenForClick = (
      (
        className === styles.functionIconColumn ||
        className === styles.functionIconLine ||
        className === styles.functionIconLineSelected ||
        className === styles.functionBtn
      ) || (
        className.baseVal?.indexOf(styles.functionIconColumn) >= 0 ||
        className.baseVal?.indexOf(styles.functionIconLine) >= 0 ||
        className.baseVal?.indexOf(styles.functionIconLineSelected) >= 0 ||
        className.baseVal?.indexOf(styles.functionBtn) >= 0 ||
        className.baseVal?.length === 0
      )
    );
    if (!classesForbiddenForClick) {
      clickAction();
    }
  }

  function GetSpecialtyColumn() {
    return worker.specialty.slice(2).split('\n●').slice(0, 4).map((speciality, index) => {
      if (!speciality) {
        return null;
      }
      return (
        <li key={index}>
          {stringService.getLimitedString(speciality, 15)}
        </li>
      );
    });
  }

  function GetSpecialtyLine() {
    return worker.specialty?.slice(2).split('\n● ').slice(0, 4).map((speciality, index) => {
      return (
        <li 
          className={`
            ${styles[`specialityLine_${index+1}`]} 
            ${worker.specialty[index+1] ? styles.specialityLast : undefined}
          `}
          key={index} 
          style={{
            color: isSelected() ? '#CCDDFF' : '#333333b3;'
          }}
        >
          {stringService.getLimitedString(speciality, 15)}
        </li>
      );
    });
  }

  function deleteWorker() {
    setIsDelete(s => !s);
    setFunctionMenu(s => !s);
  }

  function workerInfo() {
    setIsInfo(s => !s);
    setFunctionMenu(s => !s);
  }

  function editWorker() {
    setIsEdit(s => !s);
    setFunctionMenu(s => !s);
  }

  function isColumn() {
    return mode === 'columns';
  }

  return (
    <>
      {isInfo && <WorkerInfoModalWindow worker={worker} status={setIsInfo} />}
      {isEdit && <EditWorkerModalWindow worker={worker} status={setIsEdit} />}
      {isDelete && <DeleteWorkerModalWindow worker={worker} status={setIsDelete} />}
      <div 
        className={
          `${isSelected() ? isColumn() ? styles.selectedColumn : styles.selectedLine : undefined} 
          ${isColumn()
            ? styles.column 
            : styles.line
          }`
        } 
        onClick={checkClickClassName}
      >
        {showFunctionMenu &&
          <BsThreeDotsVertical 
            className={`
              ${isColumn() ? styles.functionIconColumn : styles.functionIconLine}
              ${!isColumn() && isSelected() ? styles.functionIconLineSelected : undefined }
            `} 
            onClick={() => setFunctionMenu(s => !s)} 
          />
        }
        
        {functionsMenu &&
          <div className={isColumn() ? styles.functionsMenuColumn : styles.functionsMenuLine}>
            <BsTriangleFill className={styles.triangle} />
            <div className={styles.functionsMenuBody}>
              <div style={{position: 'relative'}}>
                <ul className={styles.functionsList}>
                  <li><input type='button' className={styles.functionBtn} value='Информация' onClick={workerInfo} /></li>
                  <li><input type='button' className={styles.functionBtn} value='Редактировать' onClick={editWorker} /></li>
                  <li><input type='button' className={styles.functionBtn} value='Удалить' onClick={deleteWorker} /></li>
                </ul>
              </div>
            </div>
          </div>
          
        }
        {isColumn() ?
          <div className={styles.photo} style={{backgroundImage: `url(${worker.photo})`}}></div>
        :
          <h1 className={styles.index}>{index}</h1>
        }

        <div className={isColumn() ? styles.shortInfoColumn : styles.shortInfoLine}>
          <h3 className={`${isSelected() && !isColumn() ? styles.selectedFullNameLine : undefined} ${isColumn() ? styles.fullNameColumn : styles.fullNameLine}`}>
            {worker.fullname}
          </h3>
          <ul className={isColumn() ? styles.specialtyColumn : styles.specialtyLine}>
            {isColumn() ? <GetSpecialtyColumn /> : <GetSpecialtyLine />}
          </ul>
          {isSelected() && isColumn() &&
            <BsCheck2 className={styles.check} />
          }
        </div>
      </div>
    </>
  );
});

export default Worker;
