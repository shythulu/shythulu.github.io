import Link from 'next/link';

const links = [
  { name: 'DarkBerry', href: 'https://www.slacklab.ca/DarkBerry/' },
  { name: 'Wett demo', href: 'https://wett.slacklab.ca/' },
  { name: 'GitHub', href: 'https://github.com/shythulu' },
];

export default function Home() {
  return (
    <>
      <div className="bog" aria-hidden="true" />

      <main className="container home">
        <div className="monogram" aria-hidden="true">S</div>
        <h1>slackLab</h1>

        <nav aria-label="Projects">
          {links.map((link, i) => (
            <span className="nav-item" key={link.name}>
              {i > 0 && <span className="dot" aria-hidden="true" />}
              <a href={link.href}>{link.name}</a>
            </span>
          ))}
        </nav>
      </main>

      <footer className="site-footer">
        <Link className="why-link" href="/why/">
          Why slackLab?
        </Link>
        Built with Next.js and Skeleton · Coloured with DarkBerry
      </footer>
    </>
  );
}
