import { COMPONENT_ROUTES } from '@/sitemap';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  redirect(`/components/${component}/configurator`);
}

// This function returns an array of possible "component" values that will be used to generate static pages
export function generateStaticParams() {
  return COMPONENT_ROUTES;
}
