import './scss-helper.scss';

export const ScssHelper = (): JSX.Element => (
  <>
    <h2>Helper</h2>
    <h3>Screen Reader Only</h3>
    <div className="playground">
      <p>Some visible label</p>
      <p>
        <span className="sr-only">Some hidden label</span>
      </p>
    </div>
  </>
);
