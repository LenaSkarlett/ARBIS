import styles from './index.module.css';
import { observer } from 'mobx-react-lite';

const LandingWorker = observer(({ worker, selectedWorker, setSelectedWorker }) => {
  
  function isSelected() {
    return worker.id === selectedWorker.id;
  }

  function selectWorker() {
    if (!isSelected()) {
      setSelectedWorker(worker);
    }
  }

  function getLimitedString(text, maxlength, lastSymbols = 0, isBeautifulEnding = true, textMissingWarning) {
    if (text.length === 0 && textMissingWarning) {
      return textMissingWarning;
    }
  
    if (text.length <= maxlength) {
      return text;
    }
  
    if (lastSymbols) {
      return `${text.substring(0, maxlength)}...${text.substring(text.length - lastSymbols)}`;
    }
  
    let limitedString = text.toString().substring(0, maxlength)
  
    if (isBeautifulEnding && !lastSymbols) {
      let lastSymbolsAfterSpace = limitedString.split(" ").slice(-1)[0];
  
      const isManyLastSymbols = (
        lastSymbolsAfterSpace.length === limitedString.length || 
        lastSymbolsAfterSpace.length >= limitedString.length/2
      );
      if (isManyLastSymbols) {
        return `${limitedString}...`;
      }
  
      const lengthLimitedString = limitedString.length;
      const lengthLastSymbolsAndSpace = lastSymbolsAfterSpace.length+1;
      const maxLengthForBeautifulText = lengthLimitedString - lengthLastSymbolsAndSpace;
      
      const limitedStringWithoutLastSymbols = limitedString.substring(0, maxLengthForBeautifulText);
      return `${limitedStringWithoutLastSymbols}...`;
    }
  
    return `${limitedString}...`;
  }

  return (
    <>
      <div className={isSelected() ? styles.isSelected : styles.workerBlock} onClick={selectWorker} >
        <div className={isSelected() ? styles.selectedPhoto : styles.photo} style={{backgroundImage: `url(${worker.photo})`}} > </div>
        <div className={styles.text}>
          <h3 className={styles.fullName}>
            {worker.fullname}
          </h3>
          <ul className={styles.specialty}>
            {worker.specialty?.slice(0, 4).map((spec, index) => 
              <li key={index}>{getLimitedString(spec, 15)}</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
});

export default LandingWorker;
