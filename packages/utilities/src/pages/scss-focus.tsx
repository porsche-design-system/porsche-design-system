import './scss-focus.scss';

export const ScssFocus = (): JSX.Element => (
  <>
    <h2>Focus</h2>
    <div className="playground">
      <button id="focusable-element-regular">Some label</button>
    </div>
    <div className="playground">
      <button id="focusable-element-custom">Some label</button>
    </div>
    <div className="playground">
      <button id="focusable-element-pseudo" style={{position: 'relative', outline: 'transparent'}}>
        Some label
      </button>
    </div>
    <div className="playground">
      <button id="focusable-element-custom-pseudo" style={{position: 'relative', outline: 'transparent'}}>
        Some label
      </button>
    </div>
  </>
);
