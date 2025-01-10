import { PText } from '@porsche-design-system/components-react/ssr';

export default function Home() {
  return (
    <>
      <PText className="-col-span-full-1">Content</PText>

      <div className="tile -col-span-4">Grid span 4x</div>
      <div className="tile -col-span-4">Grid span 4x</div>
      <div className="tile -col-span-4">Grid span 4x</div>

      <div className="tile -col-span-full-1">12 Grid columns</div>
      <div className="tile -col-span-full-2">10 Grid columns</div>
      <div className="tile -col-span-full-3">8 Grid columns</div>
    </>
  );
}
