import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FrameworkCodeBlock } from '@/components/common/FrameworkCodeBlock';
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

describe('FrameworkCodeBlock', () => {
  it('highlights normalized code and updates it with the selected framework', () => {
    render(
      <StorefrontFrameworkProvider>
        <FrameworkCodeBlock
          language="bash"
          render={({ componentPackageName }) => `
            npm install ${componentPackageName}
          `}
        />
        <FrameworkSwitch />
      </StorefrontFrameworkProvider>
    );

    const code = document.querySelector('code');

    expect(code).toHaveTextContent('npm install @porsche-design-system/components-js');
    expect(code).toHaveClass('language-bash');
    expect(code?.closest('pre')).toHaveClass('hljs');

    fireEvent.click(screen.getByRole('button', { name: 'Select React' }));

    expect(code).toHaveTextContent('npm install @porsche-design-system/components-react');
  });
});
