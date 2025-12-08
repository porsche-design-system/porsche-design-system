import { PCarousel } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const CarouselExampleFocusOnCenterSlidePage = (): JSX.Element => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slideStyles = {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#00b0f4',
      height: '150px',
      transition: 'background 0.3s ease',
    },
    active: {
      background: '#fc4040',
    },
    prevNext: {
      background: '#f7cb47',
    },
  };

  const getSlideStyle = (index: number) => {
    if (index === activeSlideIndex) {
      return { ...slideStyles.base, ...slideStyles.active };
    }
    if (index === activeSlideIndex - 1 || index === activeSlideIndex + 1) {
      return { ...slideStyles.base, ...slideStyles.prevNext };
    }
    return slideStyles.base;
  };

  const onCarouselUpdate = (newIndex: number) => {
    setActiveSlideIndex(newIndex);
  };
  return (
    <PCarousel
      slidesPerPage={3}
      heading="Some Heading"
      onUpdate={(e) => onCarouselUpdate(e.detail.activeIndex)}
      focusOnCenterSlide
      trimSpace={false}
      gradient={true}
      // @ts-expect-error: ignore unknown property (TS2353)
      style={{ '--p-gradient-color-width': '25%' }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div style={getSlideStyle(i)} key={i}>
          {`Slide ${i + 1}`}
        </div>
      ))}
    </PCarousel>
  );
};
