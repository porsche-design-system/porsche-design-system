import { useEffect, useState } from 'react';
import { PButton, PTabsBar, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

export const InitializerPage = (): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);

  const props = isEnabled
    ? { onTabChange: (x: { detail: { activeTabIndex: any } }) => console.log(x.detail.activeTabIndex) }
    : {};

  useEffect(() => {
    setTimeout(() => {
      setIsEnabled(true);
    }, 1000);
    setTimeout(() => {
      setIsEnabled(false);
    }, 5000);
  }, []);

  return (
    <>
      <div className="playground light">
        <PorscheDesignSystemProvider prefix={'test-prefix'}>
          <PorscheDesignSystemProvider prefix={'test2'}>
            <PButton hideLabel={{ base: true, s: false }} onClick={() => console.log('Button Clicked')}>
              Hallo Welt
            </PButton>
          </PorscheDesignSystemProvider>
          <PButton hideLabel={{ base: true, s: false }} onClick={() => console.log('Button Clicked')}>
            Hallo Welt
          </PButton>
        </PorscheDesignSystemProvider>
      </div>
      <button>Hallo f</button>
    </>
  );
};
