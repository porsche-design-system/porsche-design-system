import { useState } from 'react';
import type { NextPage } from 'next';
import { PButton } from '@porsche-design-system/components-react/ssr';

const ThemeInjectionPage: NextPage = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="playground light">
      <PButton theme="light">Light Button</PButton>
      <PButton theme="dark">Dark Button</PButton>
      <br />
      <PButton onClick={() => setIsVisible((prev) => !prev)}>Show/Hide Button</PButton>
      {isVisible && <PButton>Global Theme</PButton>}
    </div>
  );
};

export default ThemeInjectionPage;
