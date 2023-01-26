/* Auto Generated File */
import { Toast } from '../components';

export const ToastBasicStateNeutralPage = (): JSX.Element => {
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
        <Toast text="Some message" state="neutral" />
      </div>
    </>
  );
};
