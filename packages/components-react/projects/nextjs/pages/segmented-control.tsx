/* Auto Generated File */
import type { NextPage } from 'next';
import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react/ssr';

const SegmentedControlPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render default segmented-control">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render default segmented-control on surface">
        <PSegmentedControl value="s" backgroundColor="background-surface">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render default segmented-control on dark theme">
        <PSegmentedControl value="s" theme="dark">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render default segmented-control on dark theme surface">
        <PSegmentedControl value="s" theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with labels on surface">
        <PSegmentedControl value="s" backgroundColor="background-surface">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with columns=1">
        <PSegmentedControl columns={1}>
          <PSegmentedControlItem value="s" label="Size">columns=1</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">columns=1</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">columns=1</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>columns=1</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with columns=2">
        <PSegmentedControl columns={2}>
          <PSegmentedControlItem value={1}>columns=2</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>columns=2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>columns=2</PSegmentedControlItem>
          <PSegmentedControlItem value={4} disabled={true}>columns=2</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with columns=3">
        <PSegmentedControl columns={3}>
          <PSegmentedControlItem value={1}>columns=3</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>columns=3</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>columns=3</PSegmentedControlItem>
          <PSegmentedControlItem value={4} disabled={true}>columns=3</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with columns=4">
        <PSegmentedControl columns={4}>
          <PSegmentedControlItem value={1}>columns=4</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>columns=4</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>columns=4</PSegmentedControlItem>
          <PSegmentedControlItem value={4} disabled={true}>columns=4</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with columns=5">
        <PSegmentedControl columns={5}>
          <PSegmentedControlItem value={1}>columns=5</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>columns=5</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>columns=5</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>columns=5</PSegmentedControlItem>
          <PSegmentedControlItem value={5} disabled={true}>columns=5</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with responsive columns">
        <PSegmentedControl columns={{ base: 'auto', xs: 1, s: 2, m: 3, l: 4, xl: 5 }}>
          <PSegmentedControlItem value={1}>columns responsive</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>columns responsive</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>columns responsive</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>columns responsive</PSegmentedControlItem>
          <PSegmentedControlItem value={5} disabled={true}>columns responsive</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should break word">
        <PSegmentedControl>
          <PSegmentedControlItem value={1}>Pneumonoultramicroscopicsilicovolcanoconiosis</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Pneumonoultramicroscopicsilicovolcanoconiosis</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Pneumonoultramicroscopicsilicovolcanoconiosis</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>Pneumonoultramicroscopicsilicovolcanoconiosis</PSegmentedControlItem>
          <PSegmentedControlItem value={5} disabled={true}
            >Pneumonoultramicroscopicsilicovolcanoconiosis</PSegmentedControlItem
          >
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with labels on dark theme">
        <PSegmentedControl value="s" theme="dark">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with labels on dark theme surface">
        <PSegmentedControl value="s" theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value="s" label="Size">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with icons">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled={true}>Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light surface" title="should render segmented-control with icons on surface">
        <PSegmentedControl value={1} backgroundColor="background-surface">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled={true}>Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark" title="should render segmented-control with icons on dark theme">
        <PSegmentedControl value={1} theme="dark">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled={true}>Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground dark surface" title="should render segmented-control with icons on dark theme surface">
        <PSegmentedControl value={1} theme="dark" backgroundColor="background-surface">
          <PSegmentedControlItem value={1} icon="increase">Start</PSegmentedControlItem>
          <PSegmentedControlItem value={2} icon="lock">Stop</PSegmentedControlItem>
          <PSegmentedControlItem value={3} icon="question">FAQ</PSegmentedControlItem>
          <PSegmentedControlItem value={4} icon="shopping-cart">Checkout</PSegmentedControlItem>
          
          <PSegmentedControlItem value={5} iconSource="./assets/icon-custom-kaixin.svg" disabled={true}>Confirmation</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with labels and icons">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} label="Variant" icon="wrench">Default</PSegmentedControlItem>
          <PSegmentedControlItem value={2} label="Variant" icon="wrenches">Advanced</PSegmentedControlItem>
          <PSegmentedControlItem value={3} label="Variant" icon="truck">Large</PSegmentedControlItem>
          
          <PSegmentedControlItem value={4} label="Variant" icon="tachometer" disabled={true}>Custom</PSegmentedControlItem>
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
          <PSegmentedControlItem value="xxxl" disabled={true}>Size XXXL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with value edge case">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M is very long with a line break</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with label edge case">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s" label="Size is longer">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m" label="Size">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l" label="Size">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl" label="Size" disabled={true}>XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with multiple edge cases">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} label="Size is wider than value">S</PSegmentedControlItem>
          
          <PSegmentedControlItem value={2} label="Size with icon" icon="truck" disabled={true}>M is very wide with icon</PSegmentedControlItem>
          <PSegmentedControlItem value={3} label="Icon only" icon="user" />
          <PSegmentedControlItem value={4}>XL without label</PSegmentedControlItem>
          <PSegmentedControlItem value={5} label="Label only" />
          <PSegmentedControlItem value={6} icon="truck" disabled={true} />
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with icons only">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1} icon="truck" />
          <PSegmentedControlItem value={2} icon="car" />
          <PSegmentedControlItem value={3} icon="bell" />
          <PSegmentedControlItem value={4} icon="garage" />
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control without wrapping the content onto a new line">
        <PSegmentedControl value={2}>
          <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
          <PSegmentedControlItem value={4} disabled={true}>Option 4</PSegmentedControlItem>
          <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div className="playground light" title="should render segmented-control with centered content">
        <PSegmentedControl value={1}>
          <PSegmentedControlItem value={1}>12:00</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>13:00</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>14:00</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>15:00</PSegmentedControlItem>
        </PSegmentedControl>
      </div>
    </>
  );
};

export default SegmentedControlPage;
