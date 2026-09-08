export const TailwindcssGrid = () => {
  return (
    <div className="tw:grid-template tw:prose-text-sm tw:text-center _pds-grid-visualization">
      <div className="tw:col-full tw:p-fluid-sm tw:bg-[rgba(0,0,255,.25)]">Full</div>
      <div className="tw:col-wide tw:p-fluid-sm tw:bg-[rgba(0,255,255,.25)]">Wide</div>
      <div className="tw:col-extended tw:p-fluid-sm tw:bg-[rgba(0,255,0,.25)]">Extended</div>
      <div className="tw:col-basic tw:p-fluid-sm tw:bg-[rgba(255,0,255,.25)]">Basic</div>
      <div className="tw:col-narrow tw:p-fluid-sm tw:bg-[rgba(255,255,0,.25)]">Narrow</div>
      {/*<div className="tw:col-wide tw:grid tw:grid-cols-subgrid tw:gap-y-fluid-md">*/}
      {/*  <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(0,255,255,.25)]">One Half (Wide)</div>*/}
      {/*  <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(0,255,255,.25)]">One Half (Wide)</div>*/}
      {/*</div>*/}
      <div className="tw:col-extended tw:grid tw:grid-cols-subgrid tw:gap-y-fluid-md">
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(0,255,0,.25)]">
          One Half (Extended)
        </div>
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(0,255,0,.25)]">
          One Half (Extended)
        </div>
      </div>
      <div className="tw:col-basic tw:grid tw:grid-cols-subgrid tw:gap-y-fluid-md">
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Half (Basic)
        </div>
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Half (Basic)
        </div>
        <div className="tw:col-span-one-third tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Third (Basic)
        </div>
        <div className="tw:col-span-one-third tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Third (Basic)
        </div>
        <div className="tw:col-span-one-third tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Third (Basic)
        </div>
        <div className="tw:col-span-two-thirds tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          Two Thirds (Basic)
        </div>
        <div className="tw:col-span-one-third tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Third (Basic)
        </div>
        <div className="tw:col-span-one-third tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          One Third (Basic)
        </div>
        <div className="tw:col-span-two-thirds tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,0,255,.25)]">
          Two Thirds (Basic)
        </div>
      </div>
      <div className="tw:col-narrow tw:grid tw:grid-cols-subgrid tw:gap-y-fluid-md">
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,255,0,.25)]">
          One Half (Narrow)
        </div>
        <div className="tw:col-span-one-half tw:p-fluid-sm tw:rounded-lg tw:bg-[rgba(255,255,0,.25)]">
          One Half (Narrow)
        </div>
      </div>
    </div>
  );
};
