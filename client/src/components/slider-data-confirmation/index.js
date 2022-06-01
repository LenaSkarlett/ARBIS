import { useState } from 'react';
import Slides from './slides';
import Pages from './pages';
import Media from 'react-media';

const SliderDataConfirmation = ({ 
  showPages = true,
  slides = [], 
  direction = 'columns', 
  slidesOnPage = 5, 
  defaultPage = 1, 
  reverse = false, 
  center = false
}) => {
  const [slidesToShow] = useState(slidesOnPage);
  const [page, setPage] = useState(defaultPage);

  return (
    <div style={{margin: '0 auto'}}>
      <Media query={{ minWidth: 1230 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={5} reverse={reverse} center={center} />
            {showPages && slides.length > 5 && <Pages page={page} slides={slides} slidesToShow={5} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ minWidth: 1000, maxWidth: 1229 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={4} reverse={reverse} center={center} />
            {showPages && slides.length > 4 && <Pages page={page} slides={slides} slidesToShow={4} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ minWidth: 750, maxWidth: 999 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={3} reverse={reverse} center={center} />
            {showPages && slides.length > 3 && <Pages page={page} slides={slides} slidesToShow={3} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ maxWidth: 749 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={2} reverse={reverse} center={center} />
            {showPages && slides.length > 2 && <Pages page={page} slides={slides} slidesToShow={2} setPage={setPage} />}
          </>
        }
      </Media>
    </div>
  );
}

export default SliderDataConfirmation;
