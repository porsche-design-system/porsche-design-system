import { PToastItem } from '@porsche-design-system/components-react';

export const ToastItemPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render toast neutral on light background">
        <PToastItem message="Some neutral message" state="neutral" />
      </div>

      <div className="playground dark" title="should render toast neutral on dark background">
        <PToastItem message="Some neutral message" state="neutral" theme="dark" />
      </div>

      <div className="playground light" title="should render toast success on light background">
        <PToastItem message="Some success message" state="success" />
      </div>

      <div className="playground dark" title="should render toast success on dark background">
        <PToastItem message="Some success message" state="success" theme="dark" />
      </div>

      <div className="playground light" title="should render toast multiline message on light background">
        <PToastItem message="Some message with a very long text across multiple lines" style={{ width: 240 }} />
      </div>
    </>
  );
};
