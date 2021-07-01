import { useCallback, useState } from 'react';
import { AccordionChangeEvent, PAccordion, PText } from '@porsche-design-system/components-react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const handleAccordionChange = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    const { open } = e.detail;
    setIsOpen(open);
  }, []);

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen} onAccordionChange={handleAccordionChange}>
        <PText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </PText>
        <PText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          dolore magna aliquam erat volutpat.
        </PText>
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen} onAccordionChange={handleAccordionChange}>
        <PText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </PText>
        <PText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          dolore magna aliquam erat volutpat.
        </PText>
      </PAccordion>
    </>
  );
};
