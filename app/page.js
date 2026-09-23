const projects = [
  {
    name: 'DarkBerry',
    href: 'https://github.com/shythulu/DarkBerry',
    blurb: 'A four-flavour berry theme for editors, terminals and everything else. The colours on this page are its Mire flavour.',
  },
  {
    name: 'PDFPundit',
    href: 'https://github.com/shythulu/PDFPundit',
    blurb: 'Fix PDFs, poop Markdown. Meow.',
  },
  {
    name: 'Everything else',
    href: 'https://github.com/shythulu',
    blurb: 'Dotfiles, half-finished Rust, and whatever the lab needed that week.',
  },
];

export default function Home() {
  return (
    <>
      <main className="container">
        <section className="hero">
          <h1>
            slack<span className="mark">L</span>ab
          </h1>
          <p className="tagline">
            A small self-hosted lab, and the things that crawl out of it.
          </p>
          <a className="button button-primary" href="https://github.com/shythulu">
            GitHub
          </a>{' '}
          <a className="button" href="https://shythulu.github.io/DarkBerry/">
            DarkBerry
          </a>
        </section>

        <section className="row cards">
          {projects.map((project) => (
            <div className="one-third column" key={project.name}>
              <div className="card">
                <h3>
                  <a href={project.href}>{project.name}</a>
                </h3>
                <p>{project.blurb}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          Built with Next.js and Skeleton. Coloured with DarkBerry.
        </div>
      </footer>
    </>
  );
}
