'use client';

import { getFontFaceStylesheet, getInitialStyles } from '@porsche-design-system/components-react/partials';
import { getSharedStyles } from '../styles/getSharedStyles';
import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

type Props = {
  cdn?: 'local' | 'auto' | 'cn';
};

export const HeaderPartials = ({ cdn = 'local' }: Props) => {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return (
        <>
          {getInitialStyles({ format: 'jsx' })}
          {getSharedStyles()}
          {cdn !== 'local' ? (
            getFontFaceStylesheet({ format: 'jsx' })
          ) : (
            <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
          )}
        </>
      );
    }
  });

  return null;
};
