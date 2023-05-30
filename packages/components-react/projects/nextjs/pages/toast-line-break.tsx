/* Auto Generated File */
import type { NextPage } from 'next';
import { Toast } from '../components';

const ToastLineBreakPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 300px;
      padding: 0;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="playground light" title="should render toast info with line break on light background">
        <Toast text="Some<br> message"></PToast>
      </div>
    </>
  );
};

export default ToastLineBreakPage;
