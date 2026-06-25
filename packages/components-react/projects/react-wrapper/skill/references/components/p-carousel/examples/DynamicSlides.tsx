import React from 'react';
import { PButton, PCarousel } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const Example = () => {
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
        {Array.from(Array(amountOfSlides)).map((_, i) => (
          <div style={slideStyle} key={i} children={`Slide ${i + 1}`} />
        ))}
      </PCarousel>

      <div className="flex gap-fluid-sm mt-fluid-sm">
        <PButton type="button" onClick={onAddClick} children="Add slide" />
        <PButton type="button" onClick={onRemoveClick} children="Remove last slide" />
      </div>
    </>
  );
};
