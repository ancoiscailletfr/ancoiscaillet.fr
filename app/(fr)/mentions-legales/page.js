import { LegalPage, legalMetadata } from '../../../components/legal-page';
export const metadata = legalMetadata('fr');
export default function Route() {
  return <LegalPage lang="fr" />;
}
