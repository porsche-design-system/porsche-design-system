import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { FrameworkCodeBlock } from '@/components/mdx/FrameworkCodeBlock/FrameworkCodeBlock';
import { FrameworkLink } from '@/components/mdx/FrameworkLink/FrameworkLink';
import { Notification } from '@/components/mdx/Notification/Notification';
import {
  FrameworkPackage,
  FrameworkSkill,
  StorefrontFramework,
} from '@/components/mdx/StorefrontFramework/StorefrontFramework';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

const FrameworkSwitch = () => {
  const { setStorefrontFramework } = useStorefrontFramework();

  return (
    <button type="button" onClick={() => setStorefrontFramework('react')}>
      Select React
    </button>
  );
};

const renderWithFrameworkSwitch = (children: ReactNode) =>
  render(
    <PorscheDesignSystemProvider>
      <StorefrontFrameworkProvider>
        {children}
        <FrameworkSwitch />
      </StorefrontFrameworkProvider>
    </PorscheDesignSystemProvider>
  );

const selectReact = () => fireEvent.click(screen.getByRole('button', { name: 'Select React' }));

describe('framework-aware MDX components', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('FrameworkCodeBlock highlights normalized code and updates it with the selected framework', () => {
    renderWithFrameworkSwitch(
      <FrameworkCodeBlock
        language="bash"
        render={({ componentPackageName }) => `
            npm install ${componentPackageName}
          `}
      />
    );

    const getCode = () => document.querySelector('code');

    expect(getCode()).toHaveTextContent(/^npm install @porsche-design-system\/components-js$/);
    expect(getCode()).toHaveClass('language-bash');
    expect(getCode()?.closest('pre')).toHaveClass('hljs');

    selectReact();

    expect(getCode()).toHaveTextContent(/^npm install @porsche-design-system\/components-react$/);
  });

  it('StorefrontFramework, FrameworkPackage and FrameworkSkill render the values of the selected framework', () => {
    renderWithFrameworkSwitch(
      <p data-testid="values">
        <StorefrontFramework />|<StorefrontFramework format="name" />|<FrameworkPackage />|<FrameworkSkill />|
        <FrameworkSkill skill="audit-deprecations" />
      </p>
    );

    const values = screen.getByTestId('values');
    expect(values).toHaveTextContent(
      'js|Vanilla JS|@porsche-design-system/components-js|pds-knowledge-js|pds-audit-deprecations-js'
    );

    selectReact();

    expect(values).toHaveTextContent(
      'react|React|@porsche-design-system/components-react|pds-knowledge-react|pds-audit-deprecations-react'
    );
  });

  it('FrameworkLink links the route of the selected framework', () => {
    renderWithFrameworkSwitch(
      <FrameworkLink href={({ framework }) => `/developing/${framework}/getting-started`}>
        Getting Started
      </FrameworkLink>
    );

    const getLink = () => screen.getByRole('link', { name: 'Getting Started' });

    expect(getLink()).toHaveAttribute('href', '/developing/vanilla-js/getting-started');

    selectReact();

    expect(getLink()).toHaveAttribute('href', '/developing/react/getting-started');
  });

  it('Notification with frameworks only renders while one of them is selected', () => {
    renderWithFrameworkSwitch(
      <Notification frameworks={['react']} heading="Input Event Handling">
        Use onInput.
      </Notification>
    );

    expect(document.querySelector('p-inline-notification')).toBeNull();

    selectReact();

    const notification = document.querySelector('p-inline-notification');
    expect(notification).toHaveTextContent('Use onInput.');
    expect(notification).toHaveProperty('heading', 'Input Event Handling');
  });
});
