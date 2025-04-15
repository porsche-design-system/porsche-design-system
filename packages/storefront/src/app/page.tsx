import { Home } from '@/components/layout/Home';
import { fetchPdsVersions } from '@/utils/fetchPdsVersions';

export default async function Page() {
  const pdsVersions = await fetchPdsVersions(false);
  return <Home latestPdsVersion={pdsVersions[0]} />;
}
