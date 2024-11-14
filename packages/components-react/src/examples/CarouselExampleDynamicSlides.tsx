import { useCallback, useState } from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const CarouselExampleDynamicSlidesPage = (): JSX.Element => {
  const [amountOfSlides, setAmountOfSlides] = useState(3);
  const onAddClick = useCallback(() => setAmountOfSlides((prev) => prev + 1), []);
  const onRemoveClick = useCallback(() => setAmountOfSlides((prev) => (prev === 0 ? 0 : prev - 1)), []);

  const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#00b0f4',
    height: '150px',
  };

  return (
    <>
      <PCarousel slidesPerPage={2} heading="Some Heading">
        {Array.from(new Array(amountOfSlides)).map((_, i) => (
          <div style={slideStyle} key={i} children={`Slide ${i + 1}`} />
        ))}
      </PCarousel>

      <button type="button" onClick={onAddClick} children="Add slide" />
      <button type="button" onClick={onRemoveClick} children="Remove last slide" />
    </>
  );
};
