import { useCallback, useState } from 'react';
import { type AccordionUpdateEventDetail, PAccordion, PText } from '@porsche-design-system/components-react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const onUpdate1 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen1(e.detail.open);
  }, []);
  const onUpdate2 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen2(e.detail.open);
  }, []);

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen1} onUpdate={onUpdate1}>
        <PText>{content}</PText>
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen2} onUpdate={onUpdate2}>
        <PText>{content}</PText>
      </PAccordion>
    </>
  );
};
