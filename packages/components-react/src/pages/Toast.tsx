import { Toast } from '../components';

export const ToastPage = (): JSX.Element => {
  return (
    <>
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

      <div className="playground light" title="should render toast" style={{ height: '300px' }}>
        <Toast text="Some text" />
      </div>
    </>
  );
};
