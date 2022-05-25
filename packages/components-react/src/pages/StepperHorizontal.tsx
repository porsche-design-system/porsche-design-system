/* Auto Generated File */
import { PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-react';

export const StepperHorizontalPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render stepper on light background">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning">Step Warning</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning" disabled>Step Warning Disabled</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete" disabled>Step Warning Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render stepper on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem theme="dark" state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="warning">Step Warning</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="warning" disabled>Step Warning Disabled</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete" disabled>Step Warning Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render current step in viewport on light background">
        <PStepperHorizontal>
          <PStepperHorizontalItem>Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Step Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render current step in viewport in viewport on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem theme="dark">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="current">Step Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>
    </>
  );
};
