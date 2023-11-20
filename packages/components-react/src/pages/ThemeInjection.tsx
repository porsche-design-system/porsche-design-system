import { useState } from 'react';
import { PButton } from '@porsche-design-system/components-react';

export const ThemeInjectionPage = (): JSX.Element => {
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
