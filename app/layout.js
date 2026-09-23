import { Cormorant_Garamond, Manufacturing_Consent } from 'next/font/google';

import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/theme.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-body',
  display: 'swap',
});

const blackletter = Manufacturing_Consent({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-blackletter',
  display: 'swap',
});

export const metadata = {
  title: 'slackLab',
  description: 'A small self-hosted lab, and the things that crawl out of it.',
};

export const viewport = {
  themeColor: '#12090f',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${blackletter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
