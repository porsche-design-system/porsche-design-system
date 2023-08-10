/* Auto Generated File */
import type { NextPage } from 'next';
import { Toast } from '../../components';

const ToastBasicStateNeutralPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should render toast info with state neutral on light background">
        <Toast text="Some message" />
      </div>
    </>
  );
};

export default ToastBasicStateNeutralPage;
