import { ContactPage } from '../../../components/contact-page';
import { PageShell } from '../../../components/page-shell';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('fr', 'contact');
export default function Route() {
  return (
    <PageShell lang="fr" page="contact">
      <ContactPage lang="fr" />
    </PageShell>
  );
}
