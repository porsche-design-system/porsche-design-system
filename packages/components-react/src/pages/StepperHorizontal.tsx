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
          <PStepperHorizontalItem state="warning" disabled={true}>Step Warning Disabled</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete" disabled={true}>Step Complete Disabled</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render stepper on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem theme="dark" state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="warning">Step Warning</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="warning" disabled={true}
            >Step Warning Disabled
          </PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete" disabled={true}
            >Step Complete Disabled
          </PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render arrow left on smaller viewports on light background">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="complete">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Step Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render arrow left on smaller viewports on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem theme="dark" state="complete">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="current">Step Current</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground light" title="should render arrow left and right on smaller viewports on light background">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="complete">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render arrow left and right on smaller viewports on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem theme="dark" state="complete">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="complete">Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark" state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem theme="dark">Step 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>
    </>
  );
};
