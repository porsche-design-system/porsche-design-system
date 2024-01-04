import { useCallback, useState } from 'react';
import { type CarouselUpdateEventDetail, PCarousel, PText } from '@porsche-design-system/components-react';

export const CarouselExampleEventsPage = (): JSX.Element => {
  const [lastEventDetail, setLastEventDetail] = useState('none');
  const onUpdate = useCallback(
    (e: CustomEvent<CarouselUpdateEventDetail>) => setLastEventDetail(JSON.stringify(e.detail)),
    []
  );

  return (
    <>
      <PCarousel heading="Some Heading" onUpdate={onUpdate}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </PCarousel>
      <PText children={`Last event detail: ${lastEventDetail}`} />
    </>
  );
};
