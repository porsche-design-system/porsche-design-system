/* Auto Generated File */
import type { NextPage } from 'next';
import { Toast } from '../../components';

const ToastOffsetPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 300px;
      padding: 0;
      transform: translateX(0);
      border: 1px solid deeppink;
    }

    p-toast {
      --p-toast-position-bottom: 200px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render toast info on light background with custom bottom position">
        <Toast text="Some message" />
      </div>
    </>
  );
};

export default ToastOffsetPage;
