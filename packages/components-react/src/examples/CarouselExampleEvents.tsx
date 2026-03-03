import { type CarouselUpdateEventDetail, PCarousel, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const CarouselExampleEventsPage = (): JSX.Element => {
  const [lastEventDetail, setLastEventDetail] = useState('none');
  const onUpdate = useCallback(
    (e: CustomEvent<CarouselUpdateEventDetail>) => setLastEventDetail(JSON.stringify(e.detail)),
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
      <PCarousel heading="Some Heading" onUpdate={onUpdate}>
        <div style={slideStyle}>Slide 1</div>
        <div style={slideStyle}>Slide 2</div>
        <div style={slideStyle}>Slide 3</div>
      </PCarousel>
      <PText children={`Last event detail: ${lastEventDetail}`} />
    </>
  );
};
