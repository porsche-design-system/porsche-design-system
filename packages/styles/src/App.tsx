import { EmotionHeading } from './Emotion.tsx';
import { HeadingLargeStyle } from './typography.css.ts';

function App() {
  return (
    <>
      <h1 className="prose-heading-lg">Porsche Design System</h1>
      <h1 className="heading-large">Porsche Design System</h1>
      <h1 className={HeadingLargeStyle}>Porsche Design System</h1>
      <EmotionHeading>Porsche Design System</EmotionHeading>
    </>
  );
}

export default App;
