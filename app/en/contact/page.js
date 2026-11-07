import { ContactPage } from '../../../components/contact-page';
import { PageShell } from '../../../components/page-shell';
import { buildMetadata } from '../../../lib/metadata';
export const metadata = buildMetadata('en', 'contact');
export default function Route() {
  return (
    <PageShell lang="en" page="contact">
      <ContactPage lang="en" />
    </PageShell>
  );
}
