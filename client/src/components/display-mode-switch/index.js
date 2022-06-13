import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import { ReactComponent as ManyColumns } from './../../assets/many-columns.svg';
import { ReactComponent as FewColumns } from './../../assets/few-columns.svg';
import { ReactComponent as ManyLines } from './../../assets/many-lines.svg';
import { ReactComponent as FewLines } from './../../assets/few-lines.svg';
import Media from 'react-media';
import workersStore from './../../store';
import React, { useState, useEffect } from 'react';

const DisplayModeSwitch = observer(() => {
  const [currentMode, setCurrentMode] = useState('columns');

  useEffect(() => {
    workersStore.switchMode(currentMode);
  }, [currentMode]);

  return (
    <div className={styles.block}>

      {/* Режим отображения работников в виде колонок */}
      <Media query={{ minWidth: 750 }}>
        {matches => matches
          ?
            <label style={{cursor: 'pointer'}}>
              <input 
                name='display-mode' 
                type='radio' 
                value='columns' 
                hidden={true} 
                onClick={(e) => setCurrentMode(e.target.value)}
              />
              <ManyColumns className={currentMode === 'columns' ? styles.active : styles.default} />
            </label>
          : currentMode === 'columns' && 
            <label style={{cursor: 'pointer'}}>
              <input 
                name='display-mode' 
                type='radio' 
                value='lines'
                hidden={true} 
                onClick={(e) => setCurrentMode(e.target.value)}
              />
              <FewColumns className={currentMode === 'columns' ? styles.active : styles.default} />
            </label>
        }
      </Media>

      {/* Режим отображения работников в виде строк */}
      <Media query={{ minWidth: 750 }}>
        {matches => matches 
          ?
            <label style={{cursor: 'pointer'}}>
              <input 
                name='display-mode' 
                type='radio' 
                value='lines' 
                hidden={true} 
                onClick={(e) => setCurrentMode(e.target.value)}
              /> 
              <ManyLines className={currentMode === 'lines' ? styles.active : styles.default} />
            </label>
          : currentMode === 'lines' && 
            <label style={{cursor: 'pointer'}}>
              <input 
                name='display-mode' 
                type='radio' 
                value='columns' 
                hidden={true} 
                onClick={(e) => setCurrentMode(e.target.value)}
              /> 
              <FewLines className={currentMode === 'lines' ? styles.active : styles.default} />
            </label>
        }
      </Media>

    </div>
  );
});

export default DisplayModeSwitch;
