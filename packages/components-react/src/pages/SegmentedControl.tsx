/* Auto Generated File */
import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react';

export const SegmentedControlPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render default segmented-control">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">Size S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">Size M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">Size L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render default segmented-control on surface">
        <PSegmentedControl value="s" backgroundColor="background-surface">
          <PSegmentedControlItem value="s">Size S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">Size M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">Size L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render default segmented-control on dark theme">
        <PSegmentedControl value="s" theme="dark">
          <PSegmentedControlItem value="s">Size S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">Size M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">Size L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render default segmented-control on dark theme surface">
        <PSegmentedControl value="s" theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value="s">Size S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">Size M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">Size L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled>Size XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with labels on surface">
        <PSegmentedControl value="s" backgroundColor="background-surface">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with labels on dark theme">
        <PSegmentedControl value="s" theme="dark">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with labels on dark theme surface">
        <PSegmentedControl value="s" theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with icons">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled>
            Confirmation
          </PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with icons on surface">
        <PSegmentedControl value={1} backgroundColor="background-surface">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled>
            Confirmation
          </PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with icons on dark theme">
        <PSegmentedControl value={1} theme="dark">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled>
            Confirmation
          </PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with icons on dark theme surface">
        <PSegmentedControl value={1} theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled>
            Confirmation
          </PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels and icons">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} label="Variant" icon="wrench">Default</PSegmentedControlItem>
          <PSegmentedControlItem value={2} label="Variant" icon="wrenches">Advanced</PSegmentedControlItem>
          <PSegmentedControlItem value={3} label="Variant" icon="truck">Large</PSegmentedControlItem>
          <PSegmentedControlItem value={4} label="Variant" icon="tachometer" disabled>Custom</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render default segmented-control with many items">
        <PSegmentedControl value="xxs">
          <PSegmentedControlItem value="xxs">Size XXS</PSegmentedControlItem>
          <PSegmentedControlItem value="xs">Size XS</PSegmentedControlItem>
          <PSegmentedControlItem value="s">Size S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">Size M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">Size L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl">Size XL</PSegmentedControlItem>
          <PSegmentedControlItem value="xxl">Size XXL</PSegmentedControlItem>
          <PSegmentedControlItem value="xxxl" disabled>Size XXXL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with value edge case">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M is very long with a line break</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with label edge case">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s" label="Size is longer">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with multiple edge cases">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} label="Size is wider than value">S</PSegmentedControlItem>
          <PSegmentedControlItem value={2} label="Size with icon" icon="truck" disabled>
            M is very wide with icon
          </PSegmentedControlItem>
          <PSegmentedControlItem value={3} label="Icon only" icon="user" />
          <PSegmentedControlItem value={4}>XL without label</PSegmentedControlItem>
          <PSegmentedControlItem value={5} label="Label only" />
          <PSegmentedControlItem value={6} icon="truck" disabled />
        </PSegmentedControl>
      </div>
    </>
  );
};
