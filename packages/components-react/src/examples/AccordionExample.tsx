import { useCallback, useState } from 'react';
import type { AccordionChangeEvent } from '@porsche-design-system/components-react';
import { PAccordion, PText } from '@porsche-design-system/components-react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const onChange1 = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    setIsOpen1(e.detail.open);
  }, []);
  const onChange2 = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    setIsOpen2(e.detail.open);
  }, []);

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen1} onChange={onChange1}>
        <PText>{content}</PText>
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen2} onChange={onChange2}>
        <PText>{content}</PText>
      </PAccordion>
    </>
  );
};
