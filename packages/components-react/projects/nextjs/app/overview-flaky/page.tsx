/* Auto Generated File */
import Image from 'next/image';
import type { NextPage } from 'next';
import { PButtonTile, PLink, PLinkTile, PLinkTileModelSignature, PorscheDesignSystemProvider, PStepperHorizontal, PStepperHorizontalItem, PSwitch } from '@porsche-design-system/components-react/ssr';

const OverviewFlakyPage: NextPage = (): JSX.Element => {
  const style = `
    #app,
    :host {
      display: grid;
      grid-template-columns: repeat(2, 50%);
    }

    p-link-tile,
    p-button-tile,
    p-link-tile-model-signature,
    my-prefix-p-link-tile,
    my-prefix-p-button-tile,
    my-prefix-p-link-tile-model-signature {
      max-width: 400px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div>
        <div className="playground light" title="should render default stepper-horizontal">
          <PStepperHorizontal>
            <PStepperHorizontalItem state="current">Step 1</PStepperHorizontalItem>
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

        <div className="playground light" title="should render default link-tile">
          <PLinkTile href="#" label="Some Label" description="Default">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Beach"
            />
          </PLinkTile>
        </div>

        <div className="playground light" title="should render default button-tile">
          <PButtonTile label="Some Label" description="Default">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Beach"
            />
          </PButtonTile>
        </div>

        <div className="playground light" title="should render default link-tile-model-signature">
          <PLinkTileModelSignature heading="Some Heading" description="Default">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width={50}
              height={50}
              alt="Beach"
            />
            <PLink slot="primary" href="#primary">Some label</PLink>
            <PLink slot="secondary" href="#secondary">Some label</PLink>
          </PLinkTileModelSignature>
        </div>

        <div className="playground light" title="should render default switch">
          <PSwitch>Some label</PSwitch>
        </div>
      </div>

      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <div className="playground light" title="should render default stepper-horizontal with custom prefix">
            <PStepperHorizontal>
              <PStepperHorizontalItem state="current">Step 1</PStepperHorizontalItem>
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

          <div className="playground light" title="should render default link-tile with custom prefix">
            <PLinkTile href="#" label="Some Label" description="Default">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
                width={50}
                height={50}
                alt="Beach"
              />
            </PLinkTile>
          </div>

          <div className="playground light" title="should render default button-tile with custom prefix">
            <PButtonTile label="Some Label" description="Default">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
                width={50}
                height={50}
                alt="Beach"
              />
            </PButtonTile>
          </div>

          <div className="playground light" title="should render default link-tile-model-signature with custom prefix">
            <PLinkTileModelSignature heading="Some Heading" description="Default">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
                width={50}
                height={50}
                alt="Beach"
              />
              <PLink slot="primary" href="#primary">Some label</PLink>
              <PLink slot="secondary" href="#secondary">Some label</PLink>
            </PLinkTileModelSignature>
          </div>

          <div className="playground light" title="should render default switch with custom prefix">
            <PSwitch>Some label</PSwitch>
          </div>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default OverviewFlakyPage;
