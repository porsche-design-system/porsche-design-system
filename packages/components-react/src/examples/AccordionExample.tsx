import { type AccordionUpdateEventDetail, PAccordion, PHeading, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const AccordionExamplePage = (): JSX.Element => {
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const onUpdate1 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen1(e.detail.open);
  }, []);
  const onUpdate2 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen2(e.detail.open);
  }, []);

  const summary = 'Some summary';
  const details =
    'Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion open={isOpen1} onUpdate={onUpdate1}>
        <PHeading slot="summary" tag="h3" size="small">
          {summary}
        </PHeading>
        <PText>{details}</PText>
      </PAccordion>
      <PAccordion open={isOpen2} onUpdate={onUpdate2}>
        <PHeading slot="summary" tag="h3" size="small">
          {summary}
        </PHeading>
        <PText>{details}</PText>
      </PAccordion>
    </>
  );
};
