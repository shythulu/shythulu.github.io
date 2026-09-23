import { Bodoni_Moda, Bodoni_Moda_SC, Manufacturing_Consent } from 'next/font/google';

import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/theme.css';

// Small caps for everything except paragraphs, which use Bodoni Moda.
const bodoniSC = Bodoni_Moda_SC({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-body',
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-text',
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
    <html lang="en" className={`${bodoniSC.variable} ${bodoni.variable} ${blackletter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
