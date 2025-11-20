import { PButton } from '@porsche-design-system/components-react/ssr';
import type { NextPage } from 'next';
import { useState } from 'react';

const ThemeInjectionPage: NextPage = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="playground light">
      <PButton className="light">Light Button</PButton>
      <PButton className="dark">Dark Button</PButton>
      <br />
      <PButton onClick={() => setIsVisible((prev) => !prev)}>Show/Hide Button</PButton>
      {isVisible && <PButton>Global Theme</PButton>}
    </div>
  );
};

export default ThemeInjectionPage;
