export const ScssBorder = () => {
  return (
    <div className="scss-border">
      <div className="scss-border__radius-wrapper">
        <div className="scss-border__radius scss-border__radius--sm">Border Radius Small</div>
        <div className="scss-border__radius scss-border__radius--md">Border Radius Medium</div>
        <div className="scss-border__radius scss-border__radius--lg">Border Radius Large</div>
      </div>
      <div className="scss-border__width-wrapper">
        <div className="scss-border__width scss-border__width--thin">Border Width Thin</div>
        <div className="scss-border__width scss-border__width--regular">Border Width Regular</div>
      </div>
    </div>
  );
};
