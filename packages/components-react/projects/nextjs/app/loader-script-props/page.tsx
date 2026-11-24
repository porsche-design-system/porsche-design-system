import { getLoaderScript } from '@porsche-design-system/components-react/partials';
import { PButton } from '@porsche-design-system/components-react/ssr';

export default function LoaderScriptPropsPage() {
  return (
    <>
      <PButton id="loader-script-button" variant="secondary">
        Button registered by the loader script
      </PButton>
      {getLoaderScript({ format: 'jsx' })}
    </>
  );
}
