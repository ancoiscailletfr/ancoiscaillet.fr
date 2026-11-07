import { AboutPage } from '../../../components/about-page';
import { PageShell } from '../../../components/page-shell';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('fr', 'about');
export default function Route() {
  return (
    <PageShell lang="fr" page="about">
      <AboutPage lang="fr" />
    </PageShell>
  );
}
