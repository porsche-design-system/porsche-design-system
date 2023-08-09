/* Auto Generated File */
import type { NextPage } from 'next';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { Toast } from '../../components';

const ToastPrefixedPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 300px;
      padding: 0;
      transform: translateX(0);
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <PorscheDesignSystemProvider prefix="my-prefix">
        <div className="playground light" title="should render prefixed toast info on light background">
          <Toast text="Some message" />
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default ToastPrefixedPage;
