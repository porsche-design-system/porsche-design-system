import { PLink } from '@porsche-design-system/components-react/ssr';

type DownloadListProps = {
  /** Files in `public/`, linked relatively, e.g. `assets/downloads/AGENTS.md`, with the label of their link. */
  items: { href: string; label: string }[];
};

/** Files to download, as a row of links that save the file under its name. */
export const DownloadList = ({ items }: DownloadListProps) => (
  <div className="flex flex-wrap gap-static-sm my-fluid-sm">
    {items.map(({ href, label }) => (
      <PLink key={href} variant="secondary" icon="download" href={href} download={href.split('/').pop()}>
        {label}
      </PLink>
    ))}
  </div>
);
