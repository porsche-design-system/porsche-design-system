import { useEffect, useState } from 'react';
import { PModal } from '@porsche-design-system/components-react';
import { TableWithCaption } from '../components';

export const ModalFocusCyclePage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [isLoading]);

  const openModal = () => {
    setIsOpen(true);
    setIsLoading(true);
  };

  return (
    <>
      <button id="btn-open" onClick={openModal}>
        Open
      </button>

      <PModal heading="Some Heading" open={isOpen} onClose={() => setIsOpen(false)}>
        {isLoading ? (
          <div id="loading">Loading...</div>
        ) : (
          <>
            <TableWithCaption />
            <button id="btn-reload" onClick={() => setIsLoading(true)}>
              Reload
            </button>
          </>
        )}
      </PModal>

      <button id="btn-after">Button after</button>
    </>
  );
};
