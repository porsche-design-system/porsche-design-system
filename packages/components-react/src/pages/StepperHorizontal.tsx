/* Auto Generated File */
import { PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-react';

export const StepperHorizontalPage = (): JSX.Element => {
  const style = `
    .reset-children > :before {
      width: 2rem;
      height: 2rem;
      margin: 2rem;
      border-radius: unset;
      border: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render all numbers from 1 to 9 on light background">
        <PStepperHorizontal>
          <PStepperHorizontalItem>Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div className="playground dark" title="should render all numbers from 1 to 9 on dark background">
        <PStepperHorizontal theme="dark">
          <PStepperHorizontalItem>Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

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
          <PStepperHorizontalItem state="current">Step Current</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning">Step Warning</PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete">Step Complete</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning" disabled={true}>Step Warning Disabled </PStepperHorizontalItem>
          <PStepperHorizontalItem state="complete" disabled={true}>Step Complete Disabled </PStepperHorizontalItem>
          <PStepperHorizontalItem>Step</PStepperHorizontalItem>
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

      <div className="playground light" title="should render correct styles when overrides are set">
        <PStepperHorizontal className="reset-children">
          <PStepperHorizontalItem state="complete">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem state="warning">Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem state="current">Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>
    </>
  );
};
