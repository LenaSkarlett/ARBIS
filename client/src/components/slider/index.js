import { useState } from 'react';
import Slides from './slides';
import Pages from './pages';
import Media from 'react-media';

const Slider = ({ 
  showPages = true,
  slides = [], 
  direction = 'columns', 
  slidesOnPage = 15, 
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
            <Slides slides={slides} direction={direction} page={page} slidesToShow={slidesToShow} reverse={reverse} center={center} />
            {(showPages && slides.length > slidesToShow) && <Pages page={page} slides={slides} slidesToShow={slidesToShow} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ minWidth: 1000, maxWidth: 1229 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={12} reverse={reverse} center={center} />
            {(showPages && slides.length > 12) && <Pages page={page} slides={slides} slidesToShow={12} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ minWidth: 750, maxWidth: 999 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={9} reverse={reverse} center={center} />
            {(showPages && slides.length > 9) && <Pages page={page} slides={slides} slidesToShow={9} setPage={setPage} />}
          </>
        }
      </Media>

      <Media query={{ maxWidth: 749 }}>
        {matches => matches &&
          <>
            <Slides slides={slides} direction={direction} page={page} slidesToShow={4} reverse={reverse} center={center} />
            {(showPages &&  slides.length > 4) && <Pages page={page} slides={slides} slidesToShow={4} setPage={setPage} />}
          </>
        }
      </Media>
    </div>
  );
}

export default Slider;
