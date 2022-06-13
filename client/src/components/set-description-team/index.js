import styles from './index.module.css';
import workersStore from './../../store';
import ReactTextareaAutosize from 'react-textarea-autosize';
import React from 'react';

const SetDescriptionTeam = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1>2. Введите описание команды (необязательно)</h1>
      </div>
      <ReactTextareaAutosize 
        placeholder={`Мы движемся вперед, чтобы освободить Вас от рутины.
Чтобы Вы могли наслаждаться жизнью.`} 
        className={styles.descriptionField} 
        cols='55' 
        rows='3' 
        onBlur={(e) => workersStore.setDescription(e.target.value)}
        spellCheck={false} 
      />
    </section>
  );
}

export default SetDescriptionTeam;
