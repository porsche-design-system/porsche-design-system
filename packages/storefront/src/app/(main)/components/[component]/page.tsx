import { redirect } from 'next/navigation';
import { getLandingPath, sitemap } from '@/sitemap';

/** The component pages redirect to their first tab, like every other page with tabs. */
export default async function Page({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  redirect(getLandingPath('components', component));
}

export function generateStaticParams() {
  return Object.entries(sitemap.components.pages)
    .filter(([, page]) => 'tagName' in page)
    .map(([component]) => ({ component }));
}
