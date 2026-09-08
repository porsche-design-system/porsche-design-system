export const ScssGrid = () => {
  return (
    <div className="scss-grid-template _pds-grid-visualization">
      <div className="scss-col-full scss-col-full-bg scss-padding-small">Full</div>
      <div className="scss-col-wide scss-col-wide-bg scss-padding-small">Wide</div>
      <div className="scss-col-extended scss-col-extended-bg scss-padding-small">Extended</div>
      <div className="scss-col-basic scss-col-basic-bg scss-padding-small">Basic</div>
      <div className="scss-col-narrow scss-col-narrow-bg scss-padding-small">Narrow</div>
      {/*<div className="scss-col-wide scss-subgrid">*/}
      {/*  <div className="scss-col-wide-span-one-half-start scss-col-wide-bg scss-border-radius-large scss-padding-small">*/}
      {/*    One Half (Wide)*/}
      {/*  </div>*/}
      {/*  <div className="scss-col-wide-span-one-half-end scss-col-wide-bg scss-border-radius-large scss-padding-small">One Half (Wide)</div>*/}
      {/*</div>*/}
      <div className="scss-col-extended scss-subgrid">
        <div className="scss-col-extended-span-one-half-start scss-col-extended-bg scss-border-radius-large scss-padding-small">
          One Half (Extended)
        </div>
        <div className="scss-col-extended-span-one-half-end scss-col-extended-bg scss-border-radius-large scss-padding-small">
          One Half (Extended)
        </div>
      </div>
      <div className="scss-col-basic scss-subgrid">
        <div className="scss-col-basic-span-one-half-start scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Half (Basic)
        </div>
        <div className="scss-col-basic-span-one-half-end scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Half (Basic)
        </div>
        <div className="scss-col-basic-span-one-third-start scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Third (Basic)
        </div>
        <div className="scss-col-basic-span-one-third-follow scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Third (Basic)
        </div>
        <div className="scss-col-basic-span-one-third-end scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Third (Basic)
        </div>
        <div className="scss-col-basic-span-two-thirds-start scss-col-basic-bg scss-border-radius-large scss-padding-small">
          Two Thirds (Basic)
        </div>
        <div className="scss-col-basic-span-one-third-end scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Third (Basic)
        </div>
        <div className="scss-col-basic-span-one-third-start scss-col-basic-bg scss-border-radius-large scss-padding-small">
          One Third (Basic)
        </div>
        <div className="scss-col-basic-span-two-thirds-end scss-col-basic-bg scss-border-radius-large scss-padding-small">
          Two Thirds (Basic)
        </div>
      </div>
      <div className="scss-col-narrow scss-subgrid">
        <div className="scss-col-narrow-span-one-half-start scss-col-narrow-bg scss-border-radius-large scss-padding-small">
          One Half (Narrow)
        </div>
        <div className="scss-col-narrow-span-one-half-end scss-col-narrow-bg scss-border-radius-large scss-padding-small">
          One Half (Narrow)
        </div>
      </div>
    </div>
  );
};
