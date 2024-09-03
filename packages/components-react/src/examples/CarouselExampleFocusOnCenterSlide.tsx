import { useEffect, useState, useRef } from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const CarouselExampleFocusOnCenterSlidePage = (): JSX.Element => {
  const carouselRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateActiveSlide = (activeSlideIndex: number) => {
    if (carouselRef.current) {
      const carousel: HTMLElement = carouselRef.current;
      const slides = Array.from(carousel.children) as HTMLElement[];

      slides.forEach((slide: HTMLElement) => {
        slide.classList.remove('is-active', 'is-prev', 'is-next');
      });

      slides.forEach((slide, index) => {
        if (index === activeSlideIndex) {
          Object.assign(slide.style, activeSlideStyle);
        } else if (index === activeSlideIndex - 1) {
          Object.assign(slide.style, prevNextSlideStyle);
        } else if (index === activeSlideIndex + 1) {
          Object.assign(slide.style, prevNextSlideStyle);
        } else {
          Object.assign(slide.style, slideStyle);
        }
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      updateActiveSlide(activeSlideIndex);
    }
  }, [activeSlideIndex, updateActiveSlide]);

  const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#00b0f4',
    height: '150px',
  };

  const activeSlideStyle = {
    ...slideStyle,
    background: '#fc4040',
  };

  const prevNextSlideStyle = {
    ...slideStyle,
    background: '#f7cb47',
  };

  const onCarouselUpdate = (newIndex: number) => {
    setActiveSlideIndex(newIndex);
  };
  return (
    <PCarousel
      ref={carouselRef}
      slidesPerPage={3}
      heading="Some Heading"
      onUpdate={(e) => onCarouselUpdate(e.detail.activeIndex)}
      focusOnCenterSlide
    >
      {Array.from(Array(6)).map((_, i) => (
        <div style={slideStyle} key={i} children={`Slide ${i + 1}`} />
      ))}
    </PCarousel>
  );
};
