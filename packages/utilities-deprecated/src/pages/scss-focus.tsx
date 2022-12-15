import './scss-focus.scss';

export const ScssFocus = (): JSX.Element => (
  <>
    <h2>Focus</h2>
    <div className="playground">
      <button id="focusable-element-regular" className="focusable-element-regular">
        Some label
      </button>
    </div>
    <div className="playground">
      <button id="focusable-element-custom" className="focusable-element-custom">
        Some label
      </button>
    </div>
    <div className="playground">
      <div className="focusable-element-pseudo">
        <button id="focusable-element-pseudo">Some label</button>
      </div>
    </div>
    <div className="playground">
      <button id="focusable-element-custom-pseudo" className="focusable-element-custom-pseudo">
        Some label
      </button>
    </div>
  </>
);
