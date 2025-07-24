import { useCallback, useState } from 'react';
import type { AccordionUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import { PAccordion } from '@porsche-design-system/components-react/ssr';

const AccordionLayoutShiftPage = (): JSX.Element => {
  const [isOpen1, setIsOpen1] = useState<boolean>(true);
  const [isOpen2, setIsOpen2] = useState<boolean>(true);
  const [isOpen3, setIsOpen3] = useState<boolean>(true);

  const onUpdate1 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen1(e.detail.open);
  }, []);
  const onUpdate2 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen2(e.detail.open);
  }, []);
  const onUpdate3 = useCallback((e: CustomEvent<AccordionUpdateEventDetail>) => {
    setIsOpen3(e.detail.open);
  }, []);

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';

  return (
    <>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen1} onUpdate={onUpdate1}>
        {content}
      </PAccordion>
      <PAccordion heading="Some Heading" tag="h3" open={isOpen2} onUpdate={onUpdate2}>
        <PAccordion heading="Some Heading" tag="h3" open={isOpen3} onUpdate={onUpdate3}>
          {content}
        </PAccordion>
      </PAccordion>
    </>
  );
};

export default AccordionLayoutShiftPage;
