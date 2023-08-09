/* Auto Generated File */
import type { NextPage } from 'next';
import { Toast } from '../../components';

const ToastBasicDarkPage: NextPage = (): JSX.Element => {
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

      <div className="playground dark" title="should render toast info on dark background">
        <Toast text="Some message" theme="dark" />
      </div>
    </>
  );
};

export default ToastBasicDarkPage;
