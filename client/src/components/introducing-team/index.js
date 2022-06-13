import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import Media from 'react-media';
import $api from './../../http';
import LandingWorker from './../landing-worker';
import Slider from '../slider';

const IntroducingTeam = observer(({ pathName }) => {
  const [description, setDescription] = useState('');
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({});

  useEffect(() => {
    if (workers.length === 0) {
      getLandingInfo();
    }
      
  })

  function getLandingInfo() {
    $api.get(`/landing/${pathName}`)
      .then(response => {
        setDescription(response.data.description);
        setWorkers(response.data.workers);
        setSelectedWorker(response.data.workers[0]);
      })
      .catch(error => console.log(error));
  }

  return (
    <section className={styles.ourteam}>
      <pre className={styles.description}>{description}</pre>
      <span className={styles.introduce}>ПРЕДСТАВЛЯЕМ НАШУ КОМАНДУ</span>
      {workers.length > 0 &&
        <Slider 
          slides={
            workers.map(worker => 
              <LandingWorker worker={worker} selectedWorker={selectedWorker} setSelectedWorker={setSelectedWorker} />
            )
          }
          breakpoints={[
            {
              minWidth: 1230,
              slidesOnPage: 5
            },
            {
              minWidth: 1000,
              maxWidth: 1229,
              slidesOnPage: 4
            },
            {
              minWidth: 750,
              maxWidth: 999,
              slidesOnPage: 3
            },
            {
              maxWidth: 749,
              slidesOnPage: 2
            }
          ]}
          center={true}
        />
      }

      {workers && 
        <>
          <Media query={{minWidth: 530}}>
            {matches => matches && 
              <section className={styles.block_information_about_workers}>
                <div className={styles.all_information_about_workers}>

                  <div className={styles.photo_block} style={{backgroundImage:`url(${selectedWorker?.photo})`}}>
                  </div>

                  <div className={styles.block_with_information}>

                    <div className={styles.block}>
                      <span className={styles.title} style={{textTransform: 'uppercase', borderBottom:`0px`}}>
                        {selectedWorker?.fullname}
                      </span>
                      <ul className={styles.specialtyUl}>
                        {selectedWorker?.specialty?.map((specialty, index) =>
                          <li key={index} className={styles.specialtyText}>{specialty}</li>
                        )}
                      </ul>
                    </div>

                    <div className={styles.about_experience}>
                      <span className={styles.title}>
                        Опыт проектов
                      </span>
                      <ul>
                        {selectedWorker?.experience?.map((exp, index) =>
                          <li key={index} className={styles.main_text}>{exp}</li>
                        )}
                      </ul>
                    </div>

                    <div className={styles.about_sertificate}>
                      <div className={styles.title}>
                        Квалификация (сертификаты)
                      </div>
                      <ul>
                        {selectedWorker?.certificates?.map((certificate, index) =>
                          <li key={index} className={styles.main_text}>{certificate}</li>
                        )}
                      </ul>
                    </div>
                  </div> 
                </div>
              </section>
            }         
          </Media>

          <Media query={{ maxWidth: 530}}>
            {matches => matches && 
              <section className={styles.block_information_about_workers}>
                <div className={styles.all_information_about_workers}>

                  <div className={styles.photoFullName}>
                    <div className={styles.photo_block} style={{backgroundImage:`url(${selectedWorker?.photo})`}}></div>

                    <div className={styles.block}>
                      <span className={styles.title} style={{textTransform: 'uppercase', borderBottom:`0px`}}>
                        {selectedWorker?.fullname}
                      </span>
                      <ul className={styles.specialtyUl}>
                        {selectedWorker?.specialty?.map((specialty, index) =>
                          <li key={index} className={styles.specialtyText}>{specialty}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.bottom}>
                    <div className={styles.about_experience}>
                      <span className={styles.title}>Опыт проектов</span>
                        <ul>
                          {selectedWorker?.experience?.map((exp, index) =>
                            <li key={index} className={styles.main_text}>{exp}</li>
                          )}
                        </ul>
                    </div>

                    <div className={styles.about_sertificate}>
                      <div className={styles.title}>Квалификация (сертификаты)</div>
                      <ul>
                        {selectedWorker?.certificates?.map((certificate, index) =>
                          <li key={index} className={styles.main_text}>{certificate}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            }
          </Media>
        </>
      }
    </section>
  );
})

export default IntroducingTeam;
