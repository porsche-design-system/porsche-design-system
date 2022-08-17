import { useCallback, useState } from 'react';
import { PCarousel } from '@porsche-design-system/components-react';

export const CarouselExampleDynamicSlidesPage = (): JSX.Element => {
  const [amountOfSlides, setAmountOfSlides] = useState(3);
  const onAddClick = useCallback(() => setAmountOfSlides((prev) => prev + 1), []);
  const onRemoveClick = useCallback(() => setAmountOfSlides((prev) => (prev === 0 ? 0 : prev - 1)), []);

  return (
    <>
      <PCarousel slidesPerPage={2} heading="Some Heading">
        {Array.from(Array(amountOfSlides)).map((_, i) => (
          <div key={i} children={`Slide ${i + 1}`} />
        ))}
      </PCarousel>

      <button type="button" onClick={onAddClick} children="Add Slide" />
      <button type="button" onClick={onRemoveClick} children="Remove Slide" />
    </>
  );
};
