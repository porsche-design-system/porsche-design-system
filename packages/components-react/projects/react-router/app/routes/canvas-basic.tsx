/* Auto Generated File */
import { PCanvas, PText } from '@porsche-design-system/components-react/ssr';

const CanvasBasicPage = (): JSX.Element => {
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

      <PCanvas>
        <PText>Content</PText>
        <span />
        <PText>Content</PText>
      </PCanvas>
    </>
  );
};

export default CanvasBasicPage;
