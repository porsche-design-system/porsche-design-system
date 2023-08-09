/* Auto Generated File */
'use client';
import type { NextPage } from 'next';
import { PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';
import { useEffect, useState } from 'react';
import { componentsReady } from '@porsche-design-system/components-react/ssr';

/**
 * Since React 18, using componentsReady() within useEffect() constantly resolves with `0` in headless Chrome.
 * Therefore, we make it poll and check that more than `0` components are ready.
 */
const pollComponentsReady = async (): Promise<number> => {
  const amount = await componentsReady();
  if (amount === 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return pollComponentsReady();
  } else {
    return amount;
  }
};


const CoreInitializerPage: NextPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  return (
    <>
      <div className="playground light">
        <PTextFieldWrapper label="Some Label" description="Some Description">
          <input type="text" />
        </PTextFieldWrapper>

        {allReady && (
          <div>
            <PTextFieldWrapper label="Some Label" description="Some Description">
              <input type="text" />
            </PTextFieldWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default CoreInitializerPage;
