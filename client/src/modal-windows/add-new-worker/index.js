import styles from './index.module.css';
import { useEffect } from 'react';
import { GoPerson } from 'react-icons/go';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import $api from '../../http/index';
import TextareaAutosize from 'react-textarea-autosize';

const AddNewWorkerModalWindow = ({ status }) => {
  const [photo, setPhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [certificates, setCertificates] = useState('');
  const [toSave, setToSave] = useState(false);

  useEffect(() => {
    const validFullName = fullName.split(' ')[1]?.length > 0;
    const validSpecialty = specialty.length > 0;
    const validExperience = experience.length > 0;
    const validCertificates = certificates.length > 0;
    if (!toSave && photo && validFullName && validSpecialty && validExperience && validCertificates) {
      setToSave(true);
    }
    else if (toSave && (!photo || !validFullName || !validSpecialty || !validExperience || !validCertificates)) {
      setToSave(false);
    }
  }, [photo, fullName, specialty, experience, certificates]);

  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
  }, [status]);

  async function addNewWorker(event) {
    event.preventDefault();

    if (!toSave) return;

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('fullname', fullName);
    formData.append('specialty', specialty);
    formData.append('experience', experience);
    formData.append('certificates', certificates);

    $api.post('/workers', formData)
      .then(response => window.location.reload())
      .catch(error => console.log(error));
  }

  function getPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  }

  function getCaretPosition(element) {
    if (document.selection) {
      element.focus();
      const range = document.selection.createRange();
      const rangelen = range.text.length;
      range.moveStart('character', -element.value.length);
      const start = range.text.length - rangelen;
      return {
        'start': start,
        'end': start + rangelen
      };
    } 
    else if (element.selectionStart || element.selectionStart === '0') {
      return {
        'start': element.selectionStart,
        'end': element.selectionEnd
      };
    } 
    else {
      return {
        'start': 0,
        'end': 0
      };
    }
  }
  
  function setCaretPosition(element, start, end) {
    if (element.setSelectionRange) {
      element.focus();
      element.setSelectionRange(start, end);
    } else if (element.createTextRange) {
      var range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  function addBulletedListSymbol(event) {
    let value = String(event.target.value); 

    if (event.key ==='Enter') {
      const caretPosition = getCaretPosition(event.target);
      event.target.value = `${value.slice(0, caretPosition.end)}● ${value.slice(caretPosition.end)}`;
      return setCaretPosition(event.target, caretPosition.start+2, caretPosition.end+2);
    }
    else if (event.key === 'Backspace') {
      const caretPosition = getCaretPosition(event.target);
      if (value.slice(caretPosition.end-1, caretPosition.end) === '●') {
        event.target.value = value.slice(0, caretPosition.end-2) + value.slice(caretPosition.end);
        return setCaretPosition(event.target, caretPosition.start-2, caretPosition.end-2);
      }
    }

    value = value.replace(/● /gi, '').replace(/\n/gi, '\n● '); 

    if (value[0] !== '●' && value.length > 0) {
      value = `● ${value}`; 
    }
    
    event.target.value = value;
  }

  function closeModalWindow() {
    document.getElementsByTagName('body')[0].setAttribute('style', '');
    status(s => !s);
  }

  return (
    <div className={styles.background}>
      <div className={styles.window}>
        <IoClose className={styles.closeBtn} onClick={closeModalWindow} />
        <form className={styles.form} onSubmit={addNewWorker}>

          <div className={styles.about}>
            <label className={styles.loadImage} style={{backgroundImage: photo && `url(${URL.createObjectURL(photo)})`}}>
              {!photo && <GoPerson className={styles.personIcon} />}
              <input 
                type='file' 
                hidden={true} 
                onChange={getPhoto} 
                accept='image/*' 
              />
            </label>

            <div className={styles.firstInfo}>
              <label className={styles.fullName}>
                <input 
                  type='text' 
                  placeholder='ИМЯ И ФАМИЛИЯ' 
                  spellCheck={false} 
                  onChange={e => setFullName(e.target.value)} 
                  className={styles.field}
                />
              </label>
              
              <div>
                <label className={styles.roles}>
                  <TextareaAutosize 
                    placeholder='● введите роль'
                    spellCheck={false}
                    autoComplete='false'
                    onKeyUp={addBulletedListSymbol}
                    className={styles.field}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          <label className={styles.projects}>
            <span className={styles.fieldHeader}>Опыт проектов</span>
            <TextareaAutosize 
              placeholder='Введите проект'
              spellCheck={false}
              autoComplete='false'
              className={styles.field}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </label>

          <label className={styles.certificates}>
            <span className={styles.fieldHeader} style={{marginTop: '19px'}}>Квалификация (сертификаты)</span>
            <TextareaAutosize 
              placeholder='Введите сертификат'
              spellCheck={false}
              autoComplete='false'
              className={styles.field}
              value={certificates}
              onChange={(e) => setCertificates(e.target.value)}
            />
          </label>
            
          <div className={styles.buttons}>
            <input 
              className={styles.cancelBtn} 
              type="button" 
              value='Отмена' 
              onClick={closeModalWindow} 
            />
            <input 
              className={toSave ? styles.saveBtn : styles.errSaveBtn} 
              type="submit" 
              value='Сохранить' 
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddNewWorkerModalWindow;
