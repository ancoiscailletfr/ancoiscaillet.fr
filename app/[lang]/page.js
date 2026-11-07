import { HomePage } from '../../components/home-page';
import { buildMetadata } from '../../lib/metadata';
export async function generateMetadata({ params }) {
  return buildMetadata((await params).lang, 'home');
}
export default async function Route({ params }) {
  return <HomePage lang={(await params).lang} />;
}
