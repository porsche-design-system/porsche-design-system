import { type CarouselUpdateEventDetail, PButton, PCarousel } from '@porsche-design-system/components-react';
import { type MouseEvent, useCallback, useState } from 'react';

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

      {Array.from(Array(3)).map((_, i) => (
        <PButton key={i} type="button" onClick={onButtonClick} disabled={activeSlideIndex === i}>
          {i + 1}
        </PButton>
      ))}
    </>
  );
};
