import { PModal as Modal, PButton as Button, PText as Text } from '@porsche-design-system/components-react';
import React, { useState } from 'react';

export const ModalPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabledCloseButton, seIsDisabledCloseButton] = useState(false);
  const [showSubject, setShowSubject] = useState(true);

  return (
    <>
      <Button children="Toggle Close" onClick={() => seIsDisabledCloseButton((prev) => !prev)} />
      <Button children="Toggle Subject" onClick={() => setShowSubject((prev) => !prev)} />
      <Button children="Open" onClick={() => setIsOpen(true)} />
      <Modal
        open={isOpen}
        subject={showSubject ? 'Some title here' : ''}
        disableCloseButton={isDisabledCloseButton}
        onClose={() => setIsOpen(false)}
      >
        <Button children="close" onClick={() => setIsOpen(false)} />
        {Array.from(Array(5)).map((_, i) => (
          <Text
            key={i}
            children="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet."
          />
        ))}
      </Modal>
    </>
  );
};
