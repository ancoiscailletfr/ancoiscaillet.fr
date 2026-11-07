import { HomePage } from '../../components/home-page';
import { buildMetadata } from '../../lib/metadata';
export const metadata = buildMetadata('en', 'home');
export default function Route() {
  return <HomePage lang="en" />;
}
