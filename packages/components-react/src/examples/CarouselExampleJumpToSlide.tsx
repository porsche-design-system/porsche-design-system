import { type MouseEvent, useCallback, useState } from 'react';
import { type CarouselUpdateEventDetail, PCarousel } from '@porsche-design-system/components-react';

export const CarouselExampleJumpToSlidePage = (): JSX.Element => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const onUpdate = useCallback(
    (e: CustomEvent<CarouselUpdateEventDetail>) => setActiveSlideIndex(e.detail.activeIndex),
    []
  );
  const onButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) =>
      setActiveSlideIndex(parseInt(e.target.innerText) - 1),
    []
  );

  const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#00b0f4',
    height: '150px',
  };

  return (
    <>
      <PCarousel heading="Some Heading" activeSlideIndex={activeSlideIndex} onUpdate={onUpdate}>
        <div style={slideStyle}>Slide 1</div>
        <div style={slideStyle}>Slide 2</div>
        <div style={slideStyle}>Slide 3</div>
      </PCarousel>

      {Array.from(new Array(3)).map((_, i) => (
        <button key={i} type="button" onClick={onButtonClick} disabled={activeSlideIndex === i}>
          {i + 1}
        </button>
      ))}
    </>
  );
};
