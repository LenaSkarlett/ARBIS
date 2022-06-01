import styles from './index.module.css';
import workersStore from './../../store';

const SetDescriptionTeam = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1>2. Введите описание команды (необязательно)</h1>
      </div>
      <textarea 
        placeholder={`Мы движемся вперед, чтобы освободить Вас от рутины.
Чтобы Вы могли наслаждаться жизнью.`} 
        className={styles.descriptionField} 
        cols='55' 
        rows='3' 
        onBlur={(e) => workersStore.setDescription(e.target.value)}
        spellCheck={false} 
      ></textarea>
    </section>
  );
}

export default SetDescriptionTeam;
