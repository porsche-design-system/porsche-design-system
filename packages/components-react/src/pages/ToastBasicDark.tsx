/* Auto Generated File */
import { PToast } from '@porsche-design-system/components-react';
import { Toast } from '../components';

export const ToastBasicDarkPage = (): JSX.Element => {
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

      <div className="playground dark" title="should render toast neutral on dark background">
        <Toast text="Some message" theme="dark" />
      </div>
    </>
  );
};
