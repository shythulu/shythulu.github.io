import Link from 'next/link';

export const metadata = {
  title: 'Why slackLab? · slackLab',
  description: 'Where the name comes from: Slackware, dependency hell, and J.R. "Bob" Dobbs.',
};

export default function Why() {
  return (
    <>
      <main className="container story">
        <Link className="story-home" href="/" aria-label="slackLab home">
          S
        </Link>

        <article>
          <h1>Why slackLab?</h1>

          <p>
            The name comes from Slackware Linux, the first distro I really got attached to as a
            young teenager.
          </p>

          <p>
            This was before Linux had package management you could rely on. My first
            distribution was Red Hat 5.2, in 1998. SuSE Linux followed shortly after, and I
            bought both of them at the Chapters book store. I even helped fix an early nVidia
            driver package for the Riva TNT on SuSE.
          </p>

          <p>
            RPM was still in its infancy. Exploring open source software as a teenager meant
            constantly chasing package dependencies. You install one thing, it needs three
            others, and each of those needs something else. People called it dependency hell.
          </p>

          <p>
            Slackware made it easier. I could download an application&apos;s source tarball,
            extract it and compile it with relative ease. When dependencies did come up, I could
            work out what was missing and fix it myself.
          </p>

          <p>
            Around the same time I found the Church of the SubGenius, a ridiculous fake church
            devoted to J.R. &quot;Bob&quot; Dobbs and the attainment of Slack. I loved Monty
            Python at that age, and the irreverence and ridiculousness stuck with me.
          </p>

          <p>I even made a linocut of Bob as a teenager in art school.</p>

          <figure>
            <img
              src="/bob-linocut.jpg"
              width="900"
              height="1200"
              alt="Black ink linocut print of J.R. &quot;Bob&quot; Dobbs, smiling with a pipe, framed by a burst of radiating rays, titled &quot;Bob&quot; in pencil below."
            />
            <figcaption>&quot;Bob&quot;, linocut, made in art school.</figcaption>
          </figure>

          <Link className="story-back" href="/">
            ← Back to slackLab
          </Link>
        </article>
      </main>

      <footer className="site-footer">
        Built with Next.js and Skeleton · Coloured with DarkBerry
      </footer>
    </>
  );
}
