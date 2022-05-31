/* Auto Generated File */
import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react';

export const SegmentedControlPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render default segmented-control">
        <PSegmentedControl>
          <PSegmentedControlItem>Size S</PSegmentedControlItem>
          <PSegmentedControlItem>Size M</PSegmentedControlItem>
          <PSegmentedControlItem>Size L</PSegmentedControlItem>
          <PSegmentedControlItem>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render default segmented-control on surface">
        <PSegmentedControl backgroundColor="background-surface">
          <PSegmentedControlItem>Size S</PSegmentedControlItem>
          <PSegmentedControlItem>Size M</PSegmentedControlItem>
          <PSegmentedControlItem>Size L</PSegmentedControlItem>
          <PSegmentedControlItem>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render default segmented-control on dark theme">
        <PSegmentedControl theme="dark">
          <PSegmentedControlItem>Size S</PSegmentedControlItem>
          <PSegmentedControlItem>Size M</PSegmentedControlItem>
          <PSegmentedControlItem>Size L</PSegmentedControlItem>
          <PSegmentedControlItem>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render default segmented-control on dark theme surface">
        <PSegmentedControl theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem>Size S</PSegmentedControlItem>
          <PSegmentedControlItem>Size M</PSegmentedControlItem>
          <PSegmentedControlItem>Size L</PSegmentedControlItem>
          <PSegmentedControlItem>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels">
        <PSegmentedControl>
          <PSegmentedControlItem label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with labels on surface">
        <PSegmentedControl backgroundColor="background-surface">
          <PSegmentedControlItem label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with labels on dark theme">
        <PSegmentedControl theme="dark">
          <PSegmentedControlItem label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with labels on dark theme surface">
        <PSegmentedControl theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with icons">
        <PSegmentedControl>
          <PSegmentedControlItem icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem iconSource="./assets/icon-custom-kaixin.svg">Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with icons on surface">
        <PSegmentedControl backgroundColor="background-surface">
          <PSegmentedControlItem icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem iconSource="./assets/icon-custom-kaixin.svg">Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with icons on dark theme">
        <PSegmentedControl theme="dark">
          <PSegmentedControlItem icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem iconSource="./assets/icon-custom-kaixin.svg">Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with icons on dark theme surface">
        <PSegmentedControl theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem iconSource="./assets/icon-custom-kaixin.svg">Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels and icons">
        <PSegmentedControl>
          <PSegmentedControlItem label="Variant" icon="wrench">Default</PSegmentedControlItem>
          <PSegmentedControlItem label="Variant" icon="wrenches">Advanced</PSegmentedControlItem>
          <PSegmentedControlItem label="Variant" icon="truck">Large</PSegmentedControlItem>
          <PSegmentedControlItem label="Variant" icon="tachometer">Custom</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render default segmented-control with many items">
        <PSegmentedControl>
          <PSegmentedControlItem>Size XXS</PSegmentedControlItem>
          <PSegmentedControlItem>Size XS</PSegmentedControlItem>
          <PSegmentedControlItem>Size S</PSegmentedControlItem>
          <PSegmentedControlItem>Size M</PSegmentedControlItem>
          <PSegmentedControlItem>Size L</PSegmentedControlItem>
          <PSegmentedControlItem>Size XL</PSegmentedControlItem>
          <PSegmentedControlItem>Size XXL</PSegmentedControlItem>
          <PSegmentedControlItem>Size XXXL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with value edge case">
        <PSegmentedControl>
          <PSegmentedControlItem>S</PSegmentedControlItem>
          <PSegmentedControlItem>M is very long with a line break</PSegmentedControlItem>
          <PSegmentedControlItem>L</PSegmentedControlItem>
          <PSegmentedControlItem>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with label edge case">
        <PSegmentedControl>
          <PSegmentedControlItem label="Size is longer">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem label="Size">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with multiple edge cases">
        <PSegmentedControl>
          <PSegmentedControlItem label="Size is wider than value">S</PSegmentedControlItem>
          <PSegmentedControlItem label="Size with icon" icon="truck">M is very wide with icon</PSegmentedControlItem>
          <PSegmentedControlItem label="Icon only" icon="user" />
          <PSegmentedControlItem>XL without label</PSegmentedControlItem>
          <PSegmentedControlItem label="Label only" />
          <PSegmentedControlItem icon="truck" />
        </PSegmentedControl>
      </div>
    </>
  );
};
