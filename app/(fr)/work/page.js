import { PageShell } from '../../../components/page-shell';
import { WorkPage } from '../../../components/work-page';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('fr', 'work');
export default function Route() {
  return (
    <PageShell lang="fr" page="work">
      <WorkPage lang="fr" />
    </PageShell>
  );
}
