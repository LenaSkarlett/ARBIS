import React, { useState } from 'react';
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
  center = false,
  breakpoints
}) => {
  const [page, setPage] = useState(defaultPage);

  return (
    <div style={{margin: '0 auto'}}>
      {breakpoints.map((breakpoint, index) =>
        <Media key={index} query={{ 
          minWidth: breakpoint.minWidth ? breakpoint.minWidth : 0, 
          maxWidth: breakpoint.maxWidth ? breakpoint.maxWidth : 10000 
        }}>
          {matches => matches &&
            <>
              <Slides 
                slides={slides} 
                direction={direction} 
                page={page} 
                slidesToShow={breakpoint.slidesOnPage} 
                reverse={reverse} 
                center={center} 
              />
              {(showPages && slides.length > breakpoint.slidesOnPage) && 
                <Pages 
                  page={page} 
                  slides={slides} 
                  slidesToShow={breakpoint.slidesOnPage} 
                  setPage={setPage} 
                />
              }
            </>
          }
        </Media>
      )}
    </div>
  );
}

export default Slider;
