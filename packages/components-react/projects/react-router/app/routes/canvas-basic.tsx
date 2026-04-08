/* Auto Generated File */
import { PCanvas, PText } from '@porsche-design-system/components-react/ssr';

export const CanvasBasicPage = () => {
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
