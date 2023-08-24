/* Auto Generated File */
import type { NextPage } from 'next';
import { PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-react/ssr';

const StepperHorizontalPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render stepper horizontal with all numbers from 1 to 9">
        <PStepperHorizontal>
          <PStepperHorizontalItem>Small 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Small 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal size medium with all numbers from 1 to 9">
        <PStepperHorizontal size="medium">
          <PStepperHorizontalItem>Medium 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Medium 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal with all states">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="current">Current small</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning">Warning small</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Complete small</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning" disabled={true}>Warning Disabled small</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete" disabled={true}>Complete Disabled small</PStepperHorizontalItem>
          <PStepperHorizontalItem>Default small</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal size medium with all states">
        <PStepperHorizontal size="medium">
          <PStepperHorizontalItem state="current">Current medium</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning">Warning medium</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Complete medium</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning" disabled={true}>Warning Disabled medium</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete" disabled={true}>Complete Disabled medium</PStepperHorizontalItem>
          <PStepperHorizontalItem>Default medium</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal with arrow left">
        <PStepperHorizontal style={{ maxWidth: '600px' }}>
          <PStepperHorizontalItem state="complete">Scrollable 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 5</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 6</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 7</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 8</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Scrollable Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal size medium with arrow left">
        <PStepperHorizontal size="medium" style={{ maxWidth: '600px' }}>
          <PStepperHorizontalItem state="complete">Scrollable 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 5</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 6</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 7</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 8</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Scrollable Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal with arrow left and right">
        <PStepperHorizontal style={{ maxWidth: '600px' }}>
          <PStepperHorizontalItem state="complete">Scrollable 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Scrollable Current</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal size medium with arrow left and right">
        <PStepperHorizontal size="medium" style={{ maxWidth: '600px' }}>
          <PStepperHorizontalItem state="complete">Scrollable 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Scrollable 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Scrollable Current</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Scrollable 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render stepper horizontal size BreakpointCustomizable">
        <PStepperHorizontal size={{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }}>
          <PStepperHorizontalItem state="complete">Breakpoint 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Breakpoint 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Breakpoint 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Breakpoint 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Scrollable Current</PStepperHorizontalItem>
          <PStepperHorizontalItem>Breakpoint 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Breakpoint 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Breakpoint 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Breakpoint 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" style={{ padding: '0 50px' }} title="should render stepper horizontal with parent padding">
        <PStepperHorizontal>
          <PStepperHorizontalItem>Parent padding 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Parent padding 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>
    </>
  );
};

export default StepperHorizontalPage;
