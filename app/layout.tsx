import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'GIRMAIC EarthWise AI — Climate Advisor',
  description: 'Climate advisory and agricultural decision-support prototype for Ethiopian communities, founded by Girma Haile Bunaro.',
  openGraph: {
    title: 'GIRMAIC EarthWise AI — Climate Advisor',
    description: 'Climate advisory and agricultural decision-support prototype for Ethiopian communities, founded by Girma Haile Bunaro.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIRMAIC EarthWise AI — Climate Advisor',
    description: 'Climate advisory and agricultural decision-support prototype for Ethiopian communities, founded by Girma Haile Bunaro.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
