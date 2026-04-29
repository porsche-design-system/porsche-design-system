export const TailwindcssGrid = () => {
  return (
    <div className="grid-template prose-text-sm text-center _pds-grid-visualization">
      <div className="col-full p-fluid-sm bg-[rgba(0,0,255,.25)]">Full</div>
      <div className="col-wide p-fluid-sm bg-[rgba(0,255,255,.25)]">Wide</div>
      <div className="col-extended p-fluid-sm bg-[rgba(0,255,0,.25)]">Extended</div>
      <div className="col-basic p-fluid-sm bg-[rgba(255,0,255,.25)]">Basic</div>
      <div className="col-narrow p-fluid-sm bg-[rgba(255,255,0,.25)]">Narrow</div>
      {/*<div className="col-wide grid grid-cols-subgrid gap-y-fluid-md">*/}
      {/*  <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,255,.25)]">One Half (Wide)</div>*/}
      {/*  <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,255,.25)]">One Half (Wide)</div>*/}
      {/*</div>*/}
      <div className="col-extended grid grid-cols-subgrid gap-y-fluid-md">
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]">One Half (Extended)</div>
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(0,255,0,.25)]">One Half (Extended)</div>
      </div>
      <div className="col-basic grid grid-cols-subgrid gap-y-fluid-md">
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Half (Basic)</div>
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Half (Basic)</div>
        <div className="col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Third (Basic)</div>
        <div className="col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Third (Basic)</div>
        <div className="col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Third (Basic)</div>
        <div className="col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">Two Thirds (Basic)</div>
        <div className="col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Third (Basic)</div>
        <div className="col-span-one-third p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">One Third (Basic)</div>
        <div className="col-span-two-thirds p-fluid-sm rounded-lg bg-[rgba(255,0,255,.25)]">Two Thirds (Basic)</div>
      </div>
      <div className="col-narrow grid grid-cols-subgrid gap-y-fluid-md">
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]">One Half (Narrow)</div>
        <div className="col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,.25)]">One Half (Narrow)</div>
      </div>
    </div>
  );
};
