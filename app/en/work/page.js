import { PageShell } from '../../../components/page-shell';
import { WorkPage } from '../../../components/work-page';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('en', 'work');
export default function Route() {
  return (
    <PageShell lang="en" page="work">
      <WorkPage lang="en" />
    </PageShell>
  );
}
