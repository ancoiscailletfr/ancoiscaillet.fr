import { metadata as meta, RootLayout, viewport as view } from '../../components/root-layout';
export const metadata = meta;
export const viewport = view;
export default function Layout({ children }) {
  return <RootLayout lang="fr">{children}</RootLayout>;
}
