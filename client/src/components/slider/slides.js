import styles from './index.module.css';
import { useState, useEffect } from 'react';

const Slides = ({ slides, direction, page, slidesToShow, reverse, center }) => {
  const [slidesLimit, setSlidesLimit] = useState({ first: 0, last: 0 });
  const [visibleSlides, setVisibleSlides] = useState(0);

  useEffect(() => {
    setSlidesLimit({
      first: (page-1) * slidesToShow,
      last: (page-1) * slidesToShow + slidesToShow
    });
    setVisibleSlides(slides.slice(slidesLimit.first, slidesLimit.last).length);
  }, [slides, direction, page, slidesToShow, reverse, center, slidesLimit.first, slidesLimit.last]);

  return (
    <div 
      style={{
        gridTemplateColumns: center && `repeat(${visibleSlides}, 1fr)`
      }} 
      className={`${styles.slides} ${direction === 'columns' ? styles.columns : styles.lines}`}
    >
      {reverse 
        ? slides.slice(0).reverse().slice(slidesLimit.first, slidesLimit.last)
        : slides.slice(slidesLimit.first, slidesLimit.last)
      }
    </div>
  );
}

export default Slides;
