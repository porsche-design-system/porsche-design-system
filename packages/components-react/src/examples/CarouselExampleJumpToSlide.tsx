import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { PCarousel } from '@porsche-design-system/components-react';
import type { CarouselChangeEvent } from '@porsche-design-system/components-react';

export const CarouselExampleJumpToSlidePage = (): JSX.Element => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const onChange = useCallback((e: CustomEvent<CarouselChangeEvent>) => setActiveSlideIndex(e.detail.activeIndex), []);
  const onButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) =>
      setActiveSlideIndex(parseInt(e.target.innerText) - 1),
    []
  );

  return (
    <>
      <PCarousel heading="Some Heading" activeSlideIndex={activeSlideIndex} onChange={onChange}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </PCarousel>

      {Array.from(Array(3)).map((_, i) => (
        <button key={i} type="button" onClick={onButtonClick} disabled={activeSlideIndex === i}>
          {i + 1}
        </button>
      ))}
    </>
  );
};
