import { Raleway } from 'next/font/google';

import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/theme.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: 'slackLab',
  description: 'A small self-hosted lab, and the things that crawl out of it.',
};

export const viewport = {
  themeColor: '#2a1e26',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={raleway.variable}>
      <body>{children}</body>
    </html>
  );
}
