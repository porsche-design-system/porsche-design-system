import { useCallback, useState } from 'react';
import type { AccordionChangeEvent } from '@porsche-design-system/components-react';
import { PAccordion, PText } from '@porsche-design-system/components-react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isAccordion1Open, setIsAccordion1Open] = useState<boolean>(false);
  const [isAccordion2Open, setIsAccordion2Open] = useState<boolean>(false);

  const onAccordion1Change = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    setIsAccordion1Open(e.detail.open);
  }, []);
  const onAccordion2Change = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    setIsAccordion2Open(e.detail.open);
  }, []);

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isAccordion1Open} onAccordionChange={onAccordion1Change}>
        <PText>{content}</PText>
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isAccordion2Open} onAccordionChange={onAccordion2Change}>
        <PText>{content}</PText>
      </PAccordion>
    </>
  );
};
