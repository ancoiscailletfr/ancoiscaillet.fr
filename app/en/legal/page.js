import { LegalPage, legalMetadata } from '../../../components/legal-page';
export const metadata = legalMetadata('en');
export default function Route() {
  return <LegalPage lang="en" />;
}
