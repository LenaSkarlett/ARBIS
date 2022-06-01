import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import Media from 'react-media';
import $api from './../../http';
import LandingWorker from './../landing-worker';
import SliderDataConfirmation from './../slider-data-confirmation';

const IntroducingTeam = observer(({pathName}) => {
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
        console.log(response.data.workers);
        setSelectedWorker(response.data.workers[0]);
      })
      .catch(error => console.log(error));
  }

  return (
    <section className={styles.ourteam}>
      <span className={styles.description}>{description ? description : `Мы движемся вперед, чтобы освободить Вас от рутины.
Чтобы Вы могли наслаждаться жизнью.`}</span>
      <span className={styles.introduce}>ПРЕДСТАВЛЯЕМ НАШУ КОМАНДУ</span>
      {workers.length > 0 &&
        <SliderDataConfirmation 
          slides={
            workers.map(worker => 
              <LandingWorker worker={worker} selectedWorker={selectedWorker} setSelectedWorker={setSelectedWorker} />
            )
          }
          center={true}
        />
      }

      {workers && 
        <>
          <Media query={{minWidth: 530}}>
            {matches => matches && 
              <div className={styles.block_information_about_workers}>
                <div className={styles.all_information_about_workers}>

                  <div className={styles.photo_block} style={{backgroundImage:`url(${selectedWorker?.photo})`}}>
                  </div>

                  <div className={styles.block_with_information}>

                    <div className={styles.block}>
                      <span className={styles.title} style={{textTransform: 'uppercase', borderBottom:`0px`}}>
                        {selectedWorker?.fullname}
                      </span>
                      {selectedWorker?.specialty?.map((specialty, index) =>
                        <li className={styles.main_text}>{specialty}</li>
                      )}
                    </div>

                    <div className={styles.fadeBlock}>
                    </div>

                    <div className={styles.about_experience}>
                      <span className={styles.title}>
                        Опыт проектов
                      </span>
                      {selectedWorker?.experience?.map((exp, index) =>
                        <span className={styles.main_text}>{exp}</span>
                      )}
                    </div>

                    <div className={styles.about_sertificate}>
                      <div className={styles.title}>
                        Квалификация (сертификаты)
                      </div>
                      {selectedWorker?.certificates?.map((certificate, index) =>
                        <div className={styles.main_text}>{certificate}</div>
                      )}
                    </div>

                  </div> 
                </div>
              </div>
            }         
          </Media>

          <Media query={{ maxWidth: 530}}>
            {matches => matches && 
              <div className={styles.block_information_about_workers}>
                <div className={styles.all_information_about_workers}>
                  <div className={styles.photoFullName}>
                    <div className={styles.photo_block} style={{backgroundImage:`url(${selectedWorker?.photo})`}}> </div>
                    <div className={styles.block}>
                      <span className={styles.title} style={{textTransform: 'uppercase', borderBottom:`0px`}}>
                        {selectedWorker?.fullname}
                      </span>
                      {selectedWorker?.specialty?.map((specialty, index) =>
                        <li className={styles.main_text}>{specialty}</li>
                      )}
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.about_experience}>
                      <span className={styles.title}>Опыт проектов</span>
                        {selectedWorker?.experience?.map((exp, index) =>
                          <span className={styles.main_text}>{exp}</span>
                        )}
                    </div>
                    <div className={styles.about_sertificate}>
                      <div className={styles.title}>Квалификация (сертификаты)</div>
                      {selectedWorker?.certificates?.map((certificate, index) =>
                        <span className={styles.main_text}>{certificate}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          </Media>
        </>
      }
    </section>
  );
})

export default IntroducingTeam;
