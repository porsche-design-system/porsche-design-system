import { useCallback, useState } from 'react';
import { PCarousel, PText } from '@porsche-design-system/components-react';
import type { CarouselChangeEvent } from '@porsche-design-system/components-react';

export const CarouselExampleEventsPage = (): JSX.Element => {
  const [lastEventDetail, setLastEventDetail] = useState('none');
  const onCarouselChange = useCallback(
    (e: CustomEvent<CarouselChangeEvent>) => setLastEventDetail(JSON.stringify(e.detail)),
    []
  );

  return (
    <>
      <PCarousel heading="Some Heading" onCarouselChange={onCarouselChange}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </PCarousel>
      <PText children={`Last event detail: ${lastEventDetail}`} />
    </>
  );
};
