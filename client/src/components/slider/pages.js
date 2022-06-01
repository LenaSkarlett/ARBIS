import styles from './index.module.css';
import { useMemo } from 'react';
import { BsCircleFill } from 'react-icons/bs';

const Pages = ({ page, setPage, slides, slidesToShow }) => {
  const pages = useMemo(() => getPages(), [page, setPage, slides, slidesToShow]);

  function getPages() {
    const numberOfPage = Math.ceil(slides.length / (slidesToShow));
    const pages = [];

    for (let i = 1; i <= numberOfPage; i++) {
      pages.push(
        <li key={i} onClick={() => setPage(i)} className={styles.page}>
          <BsCircleFill className={page === i ? styles.activePage : styles.defaultPage} />
        </li>
      );
    }

    return pages;
  }

  return (
    <ul className={styles.pages}>
      {pages}
    </ul>
  );
}

export default Pages;
