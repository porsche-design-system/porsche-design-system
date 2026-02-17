/* Auto Generated File */
import { PCanvas, PorscheDesignSystemProvider, PText } from '@porsche-design-system/components-react/ssr';

const CanvasPrefixedPage = (): JSX.Element => {
  const style = `
    span {
      display: block;
      height: 100dvh;
      background: deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <PorscheDesignSystemProvider prefix="my-prefix">
        <div>
          <PCanvas>
            <PText>Content</PText>
            <span />
            <PText>Content</PText>
          </PCanvas>
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default CanvasPrefixedPage;
