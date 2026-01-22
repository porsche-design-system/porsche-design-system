import { Link } from 'react-router';

function App() {
  return (
    <div className="flex gap-static-md">
      <section className="p-4">
        <h2 className="prose-heading-lg">Tailwind</h2>
        <div className="flex flex-col">
          <Link to="/tailwindcss/blur">Blur</Link>
          <Link to="/tailwindcss/border">Border</Link>
          <Link to="/tailwindcss/color">Color</Link>
          <Link to="/tailwindcss/gradient">Gradient</Link>
          <Link to="/tailwindcss/grid">Grid</Link>
          <Link to="/tailwindcss/media-query">Media Query</Link>
          <Link to="/tailwindcss/motion">Motion</Link>
          <Link to="/tailwindcss/shadow">Shadow</Link>
          <Link to="/tailwindcss/skeleton">Skeleton</Link>
          <Link to="/tailwindcss/spacing">Spacing</Link>
          <Link to="/tailwindcss/typography">Typography</Link>
        </div>
      </section>
      <section className="p-4">
        <h2 className="prose-heading-lg">SCSS</h2>
        <div className="flex flex-col">
          <Link to="/scss/blur">Blur</Link>
          <Link to="/scss/border">Border</Link>
          <Link to="/scss/color">Color</Link>
          <Link to="/scss/gradient">Gradient</Link>
          <Link to="/scss/grid">Grid</Link>
          <Link to="/scss/media-query">Media Query</Link>
          <Link to="/scss/motion">Motion</Link>
          <Link to="/scss/shadow">Shadow</Link>
          <Link to="/scss/skeleton">Skeleton</Link>
          <Link to="/scss/spacing">Spacing</Link>
          <Link to="/scss/typography">Typography</Link>
        </div>
      </section>
      <section className="p-4">
        <h2 className="prose-heading-lg">Emotion</h2>
        <div className="flex flex-col">
          <Link to="/emotion/blur">Blur</Link>
          <Link to="/emotion/border">Border</Link>
          <Link to="/emotion/color">Color</Link>
          <Link to="/emotion/gradient">Gradient</Link>
          <Link to="/emotion/grid">Grid</Link>
          <Link to="/emotion/media-query">Media Query</Link>
          <Link to="/emotion/motion">Motion</Link>
          <Link to="/emotion/shadow">Shadow</Link>
          <Link to="/emotion/skeleton">Skeleton</Link>
          <Link to="/emotion/spacing">Spacing</Link>
          <Link to="/emotion/typography">Typography</Link>
        </div>
      </section>
      <section className="p-4">
        <h2 className="prose-heading-lg">Vanilla Extract</h2>
        <div className="flex flex-col">
          <Link to="/vanilla-extract/blur">Blur</Link>
          <Link to="/vanilla-extract/border">Border</Link>
          <Link to="/vanilla-extract/color">Color</Link>
          <Link to="/vanilla-extract/gradient">Gradient</Link>
          <Link to="/vanilla-extract/grid">Grid</Link>
          <Link to="/vanilla-extract/media-query">Media Query</Link>
          <Link to="/vanilla-extract/motion">Motion</Link>
          <Link to="/vanilla-extract/shadow">Shadow</Link>
          <Link to="/vanilla-extract/skeleton">Skeleton</Link>
          <Link to="/vanilla-extract/spacing">Spacing</Link>
          <Link to="/vanilla-extract/typography">Typography</Link>
        </div>
      </section>
    </div>
  );
}

export default App;
