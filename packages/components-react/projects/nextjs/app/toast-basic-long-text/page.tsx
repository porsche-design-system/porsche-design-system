/* Auto Generated File */
import type { NextPage } from 'next';
import { Toast } from '../../components';

const ToastBasicLongTextPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should render toast multiline message on light background">
        <Toast text="Some message with a very long text across multiple lines that will break once the max width of 42rem is exceeded." />
      </div>
    </>
  );
};

export default ToastBasicLongTextPage;
