/* Auto Generated File */
import { Toast } from '../components';

export const ToastBasicLongTextPage = (): JSX.Element => {
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
