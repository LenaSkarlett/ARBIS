import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { IoClose } from 'react-icons/io5';
import $api from '../../http';
import Media from 'react-media';

const LinksModalWindow = ({ status }) => {
  const [links, setLinks] = useState(null);
  
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden;');
    getLinks();
  }, [status]);

  function closeModalWindow() {
    document.getElementsByTagName('body')[0].setAttribute('style', '');
    status(s => !s);
  }

  function getLinks() {
    $api.get('/landing')
      .then(response => {
        setLinks(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function getCreateDate(_date) {
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = addZeroBeginning(date.getUTCMonth() + 1);
    const day = addZeroBeginning(date.getDate());
    return `[${year}.${month}.${day}]`;
  }


  function addZeroBeginning(number) {
    return number > 9 ? number : `0${number}`;
  }

  return (
    <div className={styles.background}>
      <div className={styles.window}>
        <IoClose className={styles.closeBtn} onClick={closeModalWindow} />
        <div className={styles.data}>
          <h1 className={styles.mainHeader}>Список созданных портфолио</h1>
          <table className={styles.linksList}>
            <tbody>
              {links?.map((link, index) => 
                <tr key={index}>
                  <td style={{paddingRight: '10px', width: 'min-content'}}>{index + 1 + '.'}</td>
                  <td>
                    <a target="_blank" rel="noreferrer" href={process.env.REACT_APP_BASE_URL + '/' + link.name}>
                      <Media query={{ maxWidth: 500 }}>
                        {matches => matches 
                          ? link.name
                          : process.env.REACT_APP_BASE_URL + '/' + link.name
                        }
                      </Media>
                      
                    </a>
                  </td>
                  <td style={{paddingLeft: '10px', whiteSpace: 'nowrap', textAlign: 'right'}} className={styles.date}>
                    {' ' + getCreateDate(link.createdat)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LinksModalWindow;
