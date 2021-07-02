import { useCallback, useState } from 'react';
import { AccordionChangeEvent, PAccordion, PText } from '@porsche-design-system/components-react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const onAccordionChange = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    const { open } = e.detail;
    setIsOpen(open);
  }, []);

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen} onAccordionChange={onAccordionChange}>
        <PText>{content}</PText>
        <PText>{content}</PText>
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen} onAccordionChange={onAccordionChange}>
        <PText>{content}</PText>
        <PText>{content}</PText>
      </PAccordion>
    </>
  );
};
