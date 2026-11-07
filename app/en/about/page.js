import { AboutPage } from '../../../components/about-page';
import { PageShell } from '../../../components/page-shell';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('en', 'about');
export default function Route() {
  return (
    <PageShell lang="en" page="about">
      <AboutPage lang="en" />
    </PageShell>
  );
}
